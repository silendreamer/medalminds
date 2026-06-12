import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaPool?: Pool;
};

export const hasDatabaseUrl = Boolean(getDatabaseUrl());

export function getDatabaseUrl() {
  const host = process.env.POSTGRES_HOST;
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DATABASE;
  const urlFromParts = host && user && password && database
    ? `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:5432/${database}?sslmode=require`
    : undefined;

  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_URL_NON_POOLING ??
    urlFromParts
  );
}

export function getPrisma() {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    throw new Error("No PostgreSQL connection URL is configured.");
  }

  if (!globalForPrisma.prismaPool) {
    const poolOptions: any = { connectionString: databaseUrl };
    // When running against some hosted providers with self-signed certs,
    // allow disabling strict TLS verification via NODE_TLS_REJECT_UNAUTHORIZED=0
    if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0') {
      poolOptions.ssl = { rejectUnauthorized: false };
    }
    globalForPrisma.prismaPool = new Pool(poolOptions);
  }

  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg(globalForPrisma.prismaPool);
    globalForPrisma.prisma = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
    });
  }

  return globalForPrisma.prisma;
}
