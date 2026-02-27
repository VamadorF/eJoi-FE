import { describe, expect, it } from 'vitest';
import {
  fromAuthApiResponse,
  fromAuthSessionApiResponse,
  toProviderAuthDto,
} from './auth.adapter';

describe('auth.adapter', () => {
  it('trunca providerUserId a 191 y limpia opcionales', () => {
    const dto = toProviderAuthDto({
      provider: 'google',
      providerUserId: `  ${'x'.repeat(250)}  `,
      email: '   ',
      name: '  Ada  ',
      avatarUrl: '  https://avatar.test/a.png  ',
    });

    expect(dto.providerUserId).toHaveLength(191);
    expect(dto.email).toBeUndefined();
    expect(dto.name).toBe('Ada');
    expect(dto.avatarUrl).toBe('https://avatar.test/a.png');
  });

  it('asimila estructura auth anidada no estandar', () => {
    const response = fromAuthApiResponse({
      data: {
        code: 200,
        token: 'jwt-token',
        user: {
          id: 'u-1',
          email: 'u@test.dev',
          name: 'User One',
        },
      },
    });

    expect(response.accessToken).toBe('jwt-token');
    expect(response.code).toBe(200);
    expect(response.user.id).toBe('u-1');
  });

  it('inserta defaults de sesion cuando el payload viene incompleto', () => {
    const response = fromAuthSessionApiResponse({
      data: { code: 200, status: 'ok' },
    });

    expect(response.isAuthenticated).toBe(true);
    expect(response.user).toBeNull();
    expect(response.code).toBe(200);
    expect(response.status).toBe('ok');
  });
});
