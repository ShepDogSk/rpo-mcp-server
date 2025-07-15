import { z } from 'zod';

// Schema pre vyhľadávacie parametre
export const searchParamsSchema = z.object({
  identifier: z.string().optional(),
  fullName: z.string().optional(),
  legalForm: z.string().optional(),
  legalStatus: z.string().optional(),
  addressMunicipality: z.string().optional(),
  addressStreet: z.string().optional(),
  establishmentAfter: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  establishmentBefore: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  terminationAfter: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  terminationBefore: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  onlyActive: z.boolean().optional(),
  dbModificationDateAfter: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dbModificationDateBefore: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  mainActivity: z.string().optional(),
  esa2010: z.string().optional(),
  sourceRegister: z.string().optional(),
  stakeholderType: z.string().optional(),
  stakeholderPersonGivenName: z.string().optional(),
  stakeholderPersonFamilyName: z.string().optional(),
  stakeholderCompanyName: z.string().optional(),
  statutoryBodyType: z.string().optional(),
  statutoryBodyGivenName: z.string().optional(),
  statutoryBodyFamilyName: z.string().optional(),
  statutoryBodyCompanyName: z.string().optional(),
  orgUnitsIdentifier: z.string().optional(),
  orgUnitsFullName: z.string().optional(),
  orgUnitsStakeholderPersonGivenName: z.string().optional(),
  orgUnitsStakeholderPersonFamilyName: z.string().optional(),
  orgUnitsStakeholderCompanyName: z.string().optional(),
});

// Schema pre detail parametre
export const detailParamsSchema = z.object({
  id: z.string(),
  showHistoricalData: z.boolean().optional(),
  showOrganizationUnits: z.boolean().optional(),
});

// Typy
export type SearchParams = z.infer<typeof searchParamsSchema>;
export type DetailParams = z.infer<typeof detailParamsSchema>;

// RPO API response schemas
export const codeValueSchema = z.object({
  value: z.string(),
  code: z.string().optional(),
  codelistCode: z.string().optional(),
});

export const timedValueEntrySchema = z.object({
  value: z.string(),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
});

export const timedCodeValueEntrySchema = z.object({
  value: codeValueSchema,
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
});

export const addressSchema = z.object({
  formatedAddress: z.string().optional(),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
  street: z.string().optional(),
  regNumber: z.number().optional(),
  buildingNumber: z.string().optional(),
  postalCodes: z.array(z.string()).optional(),
  municipality: codeValueSchema.optional(),
  country: codeValueSchema.optional(),
  district: codeValueSchema.optional(),
  buildingIndex: z.string().optional(),
});

export const personNameSchema = z.object({
  formatedName: z.string().optional(),
  givenNames: z.array(z.string()).optional(),
  familyNames: z.array(z.string()).optional(),
  givenFamilyNames: z.array(z.string()).optional(),
  prefixes: z.array(codeValueSchema).optional(),
  postfixes: z.array(codeValueSchema).optional(),
});

export const stakeholderSchema = z.object({
  stakeholderType: codeValueSchema.optional(),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
  address: addressSchema.optional(),
  personName: personNameSchema.optional(),
  identifier: z.string().optional(),
  fullName: z.string().optional(),
  establishment: z.string().optional(),
  termination: z.string().optional(),
});

export const legalEntitySchema = z.object({
  id: z.number(),
  dbModificationDate: z.string().optional(),
  identifiers: z.array(timedValueEntrySchema).optional(),
  fullNames: z.array(timedValueEntrySchema).optional(),
  alternativeNames: z.array(timedValueEntrySchema).optional(),
  addresses: z.array(addressSchema).optional(),
  legalForms: z.array(timedCodeValueEntrySchema).optional(),
  establishment: z.string().optional(),
  termination: z.string().optional(),
  stakeholders: z.array(stakeholderSchema).optional(),
  legalStatuses: z.array(timedCodeValueEntrySchema).optional(),
  license: z.string().optional(),
});

export const searchResponseSchema = z.object({
  results: z.array(legalEntitySchema),
  license: z.string(),
});

export type CodeValue = z.infer<typeof codeValueSchema>;
export type TimedValueEntry = z.infer<typeof timedValueEntrySchema>;
export type TimedCodeValueEntry = z.infer<typeof timedCodeValueEntrySchema>;
export type Address = z.infer<typeof addressSchema>;
export type PersonName = z.infer<typeof personNameSchema>;
export type Stakeholder = z.infer<typeof stakeholderSchema>;
export type LegalEntity = z.infer<typeof legalEntitySchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;
