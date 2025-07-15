/**
 * Typy pre RPO API
 */

// Základné typy
export interface CodeValue {
  value: string;
  code?: string;
  codelistCode?: string;
}

export interface TimedValueEntry {
  value: string;
  validFrom?: string;
  validTo?: string;
}

export interface TimedCodeValueEntry {
  value: CodeValue;
  validFrom?: string;
  validTo?: string;
}

// Komplexné typy
export interface Address {
  formatedAddress?: string;
  validFrom?: string;
  validTo?: string;
  street?: string;
  regNumber?: number;
  buildingNumber?: string;
  postalCodes?: string[];
  municipality?: CodeValue;
  country?: CodeValue;
  district?: CodeValue;
  buildingIndex?: string;
}

export interface Activity {
  economicActivityDescription?: string;
  validFrom?: string;
  validTo?: string;
  suspendedFrom?: string;
  suspendedTo?: string;
}

export interface PersonName {
  formatedName?: string;
  givenNames?: string[];
  familyNames?: string[];
  givenFamilyNames?: string[];
  prefixes?: CodeValue[];
  postfixes?: CodeValue[];
}

export interface Stakeholder {
  stakeholderType?: CodeValue;
  validFrom?: string;
  validTo?: string;
  address?: Address;
  personName?: PersonName;
  identifier?: string;
  fullName?: string;
  establishment?: string;
  termination?: string;
}

export interface StatutaryBody {
  stakeholderType?: CodeValue;
  statutoryBodyMember?: CodeValue;
  validFrom?: string;
  validTo?: string;
  address?: Address;
  personName?: PersonName;
  identifier?: string;
  fullName?: string;
  establishment?: string;
  termination?: string;
}

export interface Equity {
  amount?: number;
  currency?: CodeValue;
  validFrom?: string;
  validTo?: string;
}

export interface StatisticalCodes {
  statCodesActualization?: string;
  mainActivity?: CodeValue;
  esa2010?: CodeValue;
}

export interface OrganizationUnit {
  id?: number;
  identifier?: string;
  fullNames?: TimedValueEntry[];
  addresses?: Address[];
  establishment?: string;
  termination?: string;
  stakeholders?: Stakeholder[];
  statutoryBodies?: StatutaryBody[];
}

// Hlavné typy
export interface LegalEntity {
  id: number;
  dbModificationDate?: string;
  identifiers?: TimedValueEntry[];
  fullNames?: TimedValueEntry[];
  alternativeNames?: TimedValueEntry[];
  addresses?: Address[];
  legalForms?: TimedCodeValueEntry[];
  establishment?: string;
  termination?: string;
  activities?: Activity[];
  statutoryBodies?: StatutaryBody[];
  stakeholders?: Stakeholder[];
  legalStatuses?: TimedCodeValueEntry[];
  otherLegalFacts?: TimedValueEntry[];
  authorizations?: TimedValueEntry[];
  equities?: Equity[];
  shares?: any[];
  deposits?: any[];
  sourceRegister?: any;
  predecessors?: any[];
  successors?: any[];
  statisticalCodes?: StatisticalCodes;
  kuvPersonsInfo?: any[];
  topManagementsInfo?: any[];
  organizationUnits?: OrganizationUnit[];
  license?: string;
}

export interface SearchResponse {
  results: LegalEntity[];
  license: string;
}

// Parametre pre API volania
export interface SearchParams {
  identifier?: string;
  fullName?: string;
  legalForm?: string;
  legalStatus?: string;
  addressMunicipality?: string;
  addressStreet?: string;
  establishmentAfter?: string;
  establishmentBefore?: string;
  terminationAfter?: string;
  terminationBefore?: string;
  onlyActive?: boolean;
  dbModificationDateAfter?: string;
  dbModificationDateBefore?: string;
  mainActivity?: string;
  esa2010?: string;
  sourceRegister?: string;
  stakeholderType?: string;
  stakeholderPersonGivenName?: string;
  stakeholderPersonFamilyName?: string;
  stakeholderCompanyName?: string;
  statutoryBodyType?: string;
  statutoryBodyGivenName?: string;
  statutoryBodyFamilyName?: string;
  statutoryBodyCompanyName?: string;
  orgUnitsIdentifier?: string;
  orgUnitsFullName?: string;
  orgUnitsStakeholderPersonGivenName?: string;
  orgUnitsStakeholderPersonFamilyName?: string;
  orgUnitsStakeholderCompanyName?: string;
}

export interface DetailParams {
  id: string;
  showHistoricalData?: boolean;
  showOrganizationUnits?: boolean;
}
