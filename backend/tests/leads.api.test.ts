import request from 'supertest';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { app } from '../src/app.js';
import { ApiRoutes, ResponseStatus, Status } from '../src/common/literals.js';
import { prisma } from '../src/common/prisma.js';

const validLead = {
  name: 'ABC',
  email: 'abc@example.com',
  phone: '0123456789',
};

const createLead = (overrides: Partial<typeof validLead> = {}) =>
  request(app).post(ApiRoutes.LEADS).send({ ...validLead, ...overrides });

beforeEach(async () => {
  await prisma.lead.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Lead API', () => {
  it('returns the health status', async () => {
    const response = await request(app).get(ApiRoutes.HEALTH);

    expect(response.status).toBe(Status.OK);
    expect(response.body).toEqual({ status: ResponseStatus.OK });
  });

  it('creates a lead with the default status', async () => {
    const response = await createLead();

    expect(response.status).toBe(Status.CREATED);
    expect(response.body.data).toMatchObject({
      ...validLead,
      status: 'NEW',
    });
    expect(response.body.data.id).toEqual(expect.any(String));
  });

  it('rejects an invalid lead payload', async () => {
    const response = await createLead({ email: 'invalid-email' });

    expect(response.status).toBe(Status.BAD_REQUEST);
    expect(response.body.message).toBe('Request validation failed.');
  });

  it('rejects duplicate emails', async () => {
    await createLead();
    const response = await createLead();

    expect(response.status).toBe(Status.CONFLICT);
    expect(response.body.message).toBe('A lead with this email already exists.');
  });

  it('gets leads with search, status filtering, and pagination', async () => {
    await createLead();
    await createLead({
      name: 'XYZ',
      email: 'xyz@example.com',
      phone: '+91 5555555555',
    });

    const response = await request(app)
      .get(ApiRoutes.LEADS)
      .query({ search: 'AB', status: 'NEW', page: 1, limit: 1 });

    expect(response.status).toBe(Status.OK);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toMatchObject({ name: validLead.name });
    expect(response.body.meta).toEqual({ page: 1, limit: 1, total: 1, totalPages: 1 });
  });

  it('rejects invalid lead-list query values', async () => {
    const response = await request(app).get(ApiRoutes.LEADS).query({ page: 0 });

    expect(response.status).toBe(Status.BAD_REQUEST);
  });

  it('sorts leads in ascending and descending order', async () => {
    await createLead();
    await createLead({
      name: 'PQR',
      email: 'pqr@example.com',
      phone: '+912222222222',
    });

    const ascendingResponse = await request(app).get(ApiRoutes.LEADS).query({ sort: 'name' });
    const descendingResponse = await request(app).get(ApiRoutes.LEADS).query({ sort: '-name' });
    const ascendingNames = ascendingResponse.body.data.map((lead: { name: string }) => lead.name);

    expect(ascendingNames).toEqual([...ascendingNames].sort());
    expect(descendingResponse.body.data.map((lead: { name: string }) => lead.name)).toEqual(
      [...ascendingNames].reverse(),
    );
  });

  it('updates a lead status', async () => {
    const createResponse = await createLead();
    const response = await request(app)
      .patch(`${ApiRoutes.LEADS}/${createResponse.body.data.id}/status`)
      .send({ status: 'CONTACTED' });

    expect(response.status).toBe(Status.OK);
    expect(response.body.data.status).toBe('CONTACTED');
  });

  it('returns not found when a lead does not exist', async () => {
    const lead = await prisma.lead.create({ data: validLead });
    await prisma.lead.delete({ where: { id: lead.id } });

    const response = await request(app)
      .patch(`${ApiRoutes.LEADS}/${lead.id}/status`)
      .send({ status: 'CONTACTED' });

    expect(response.status).toBe(Status.NOT_FOUND);
    expect(response.body.message).toBe('Lead not found.');
  });

  it('returns not found for an unknown route', async () => {
    const response = await request(app).get('/unknown-route');

    expect(response.status).toBe(Status.NOT_FOUND);
  });
});


