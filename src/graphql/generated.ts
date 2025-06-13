import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Hex: any;
  Json: any;
  Long: any;
  RGBAHue: any;
  RGBATransparency: any;
  RichTextAST: any;
};

export type Aggregate = {
  __typename?: 'Aggregate';
  count: Scalars['Int'];
};

/** Asset system model */
export type Asset = Entity & Node & {
  __typename?: 'Asset';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Asset>;
  /** The file name */
  fileName: Scalars['String'];
  /** The file handle */
  handle: Scalars['String'];
  /** The height of the file */
  height?: Maybe<Scalars['Float']>;
  /** List of Asset versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Asset>;
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** The file size */
  size?: Maybe<Scalars['Float']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  /** Returns information you need to upload the asset. The type of upload is dependant on what you pass into asset creations as upload type. */
  upload?: Maybe<AssetUpload>;
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String'];
  /** The file width */
  width?: Maybe<Scalars['Float']>;
};


/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


/** Asset system model */
export type AssetLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: Array<Locale>;
};


/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetUrlArgs = {
  transformation?: InputMaybe<AssetTransformationInput>;
};

export type AssetConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AssetWhereUniqueInput;
};

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AssetEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AssetCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName?: InputMaybe<Scalars['String']>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<AssetCreateLocalizationsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']>;
};

export type AssetCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']>;
};

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput;
  locale: Locale;
};

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
};

export type AssetCreateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Create and connect multiple existing Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
};

export type AssetCreateOneInlineInput = {
  /** Connect one existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
};

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Asset;
};

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  upload?: InputMaybe<AssetUploadWhereInput>;
};

export enum AssetOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Identifies documents */
export type AssetSingleRelationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  upload?: InputMaybe<AssetUploadWhereInput>;
};

/** Transformations for Assets */
export type AssetTransformationInput = {
  document?: InputMaybe<DocumentTransformationInput>;
  image?: InputMaybe<ImageTransformationInput>;
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: InputMaybe<Scalars['Boolean']>;
};

export type AssetUpdateInput = {
  fileName?: InputMaybe<Scalars['String']>;
  /** Manage document localizations */
  localizations?: InputMaybe<AssetUpdateLocalizationsInput>;
  /** Use this to define if its a reupload for the asset */
  reUpload?: InputMaybe<Scalars['Boolean']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']>;
};

export type AssetUpdateLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  /** Use this to define if its a reupload for the asset */
  reUpload?: InputMaybe<Scalars['Boolean']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']>;
};

export type AssetUpdateLocalizationInput = {
  data: AssetUpdateLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<AssetUpsertLocalizationInput>>;
};

export type AssetUpdateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetConnectInput>>;
  /** Create and connect multiple Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
  /** Delete multiple Asset documents */
  delete?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Disconnect multiple Asset documents */
  disconnect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Update multiple Asset documents */
  update?: InputMaybe<Array<AssetUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Asset documents */
  upsert?: InputMaybe<Array<AssetUpsertWithNestedWhereUniqueInput>>;
};

export type AssetUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: InputMaybe<Scalars['String']>;
};

export type AssetUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AssetUpdateManyInput;
  /** Document search */
  where: AssetWhereInput;
};

export type AssetUpdateOneInlineInput = {
  /** Connect existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
  /** Delete currently connected Asset document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Asset document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Asset document */
  update?: InputMaybe<AssetUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Asset document */
  upsert?: InputMaybe<AssetUpsertWithNestedWhereUniqueInput>;
};

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AssetUpdateInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** Asset Upload */
export type AssetUpload = {
  __typename?: 'AssetUpload';
  /** Asset Upload Error */
  error?: Maybe<AssetUploadError>;
  /** Expiry Timestamp */
  expiresAt?: Maybe<Scalars['DateTime']>;
  /** Asset Request Data for upload */
  requestPostData?: Maybe<AssetUploadRequestPostData>;
  /** Asset Request Data for upload */
  status?: Maybe<AssetUploadStatus>;
};

/** Represents asset upload error */
export type AssetUploadError = {
  __typename?: 'AssetUploadError';
  code: Scalars['String'];
  message: Scalars['String'];
};

/** Asset Upload Request Post Data */
export type AssetUploadRequestPostData = {
  __typename?: 'AssetUploadRequestPostData';
  /** The algorithm to use in the form field. This value should be passed in the `X-Amz-Algorithm` form field. */
  algorithm: Scalars['String'];
  /** The credential to use in the form field. This value should be passed in the `X-Amz-Credential` form field. */
  credential: Scalars['String'];
  /** The date the request was signed, formatted as YYYYMMDDTHHMMSSZ. This value should be passed in the `X-Amz-Date` header. */
  date: Scalars['String'];
  /** The key to use in the form field. This value should be passed in the `Key` form field. */
  key: Scalars['String'];
  /** The policy to use in the form field. This value should be passed in the `Policy` form field. */
  policy: Scalars['String'];
  /** The security token to use in the form field. This field is optional only pass it if its not null. This value should be passed in the `X-Amz-Security-Token` form field if not null. */
  securityToken?: Maybe<Scalars['String']>;
  /** The signature to use in the form field. This value should be passed in the `X-Amz-Signature` form field. */
  signature: Scalars['String'];
  /** The URL to which the file should be uploaded with a POST request. */
  url: Scalars['String'];
};

/** System Asset Upload Status */
export enum AssetUploadStatus {
  AssetCreatePending = 'ASSET_CREATE_PENDING',
  AssetErrorUpload = 'ASSET_ERROR_UPLOAD',
  AssetUpdatePending = 'ASSET_UPDATE_PENDING',
  AssetUploadComplete = 'ASSET_UPLOAD_COMPLETE'
}

/** Identifies documents */
export type AssetUploadWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetUploadWhereInput>>;
  expiresAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  expiresAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  expiresAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  expiresAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  expiresAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  expiresAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  expiresAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  expiresAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<AssetUploadStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<AssetUploadStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
};

/** Identifies documents */
export type AssetUploadWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetUploadWhereInput>>;
  expiresAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  expiresAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  expiresAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  expiresAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  expiresAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  expiresAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  expiresAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  expiresAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<AssetUploadStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<AssetUploadStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
};

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  create: AssetCreateInput;
  /** Update document if it exists */
  update: AssetUpdateInput;
};

export type AssetUpsertLocalizationInput = {
  create: AssetCreateLocalizationDataInput;
  locale: Locale;
  update: AssetUpdateLocalizationDataInput;
};

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AssetUpsertInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AssetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  fileName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  fileName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  fileName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  fileName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  fileName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  fileName_starts_with?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  handle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  handle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  handle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  handle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  handle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  handle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  handle_starts_with?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  height_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  height_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  height_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  height_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  height_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  mimeType?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  mimeType_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  mimeType_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mimeType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  mimeType_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  mimeType_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  mimeType_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  mimeType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  mimeType_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  size?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  size_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  size_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  size_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  size_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  size_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  upload?: InputMaybe<AssetUploadWhereInput>;
  width?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  width_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  width_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  width_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  width_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  width_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AssetWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AssetWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long'];
};

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  __typename?: 'Color';
  css: Scalars['String'];
  hex: Scalars['Hex'];
  rgba: Rgba;
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: InputMaybe<Scalars['Hex']>;
  rgba?: InputMaybe<RgbaInput>;
};

export type ConnectPositionInput = {
  /** Connect document after specified document */
  after?: InputMaybe<Scalars['ID']>;
  /** Connect document before specified document */
  before?: InputMaybe<Scalars['ID']>;
  /** Connect document at last position */
  end?: InputMaybe<Scalars['Boolean']>;
  /** Connect document at first position */
  start?: InputMaybe<Scalars['Boolean']>;
};

export enum DocumentFileTypes {
  /** Automatically selects the best format for the image based on the browser's capabilities. */
  AutoImage = 'autoImage',
  Avif = 'avif',
  Bmp = 'bmp',
  Gif = 'gif',
  Heic = 'heic',
  Jpg = 'jpg',
  Png = 'png',
  Svg = 'svg',
  Tiff = 'tiff',
  Webp = 'webp'
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * JPG:	autoImage, bmp, gif, jpg, png, webp, tiff
   * PNG:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * SVG:	autoImage, bmp, gif, jpg, png, webp, tiff
   * WEBP:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * GIF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * TIFF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * AVIF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * PDF: 	autoImage, gif, jpg, png, webp, tiff
   *
   */
  format?: InputMaybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: InputMaybe<DocumentOutputInput>;
};

export type DocumentVersion = {
  __typename?: 'DocumentVersion';
  createdAt: Scalars['DateTime'];
  data?: Maybe<Scalars['Json']>;
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

/** An object with an ID */
export type Entity = {
  /** The id of the object. */
  id: Scalars['ID'];
  /** The Stage of an object */
  stage: Stage;
};

/** This enumeration holds all typenames that implement the Entity interface. Components and models implement the Entity interface. */
export enum EntityTypeName {
  /** Asset system model */
  Asset = 'Asset',
  Member = 'Member',
  Ordinance = 'Ordinance',
  OrdinanceMember = 'OrdinanceMember',
  /** Scheduled Operation system model */
  ScheduledOperation = 'ScheduledOperation',
  /** Scheduled Release system model */
  ScheduledRelease = 'ScheduledRelease',
  /** User system model */
  User = 'User',
  UserAdmin = 'UserAdmin'
}

/** Allows to specify input to query models and components directly */
export type EntityWhereInput = {
  /** The ID of an object */
  id: Scalars['ID'];
  locale?: InputMaybe<Locale>;
  stage: Stage;
  /** The Type name of an object */
  typename: EntityTypeName;
};

export type ImageBlurInput = {
  /** The amount of blurring to apply to the image. The value must be an integer from 1 to 20. */
  amount: Scalars['Int'];
};

/** Adds a border to the image. */
export type ImageBorderInput = {
  /** The background color of the border. The value must be a valid hex color code. Or one of the supported color names. */
  background: Scalars['String'];
  /** The color of the border. The value must be a valid hex color code. Or one of the supported color names. */
  color: Scalars['String'];
  /** The width of the border in pixels. The value must be an integer from 1 to 1000. */
  width: Scalars['Int'];
};

export type ImageCompressInput = {
  /** Preserves the metadata of the image. */
  metadata: Scalars['Boolean'];
};

/**
 * Crops the image to the specified dimensions.
 * The starting points for X and Y coordinates are [0,0], aligning with the top-left corner of the image.
 * The width and height parameters determine the size in pixels of the cropping rectangle.
 * The output will include only the portion of the image within the designated crop area.
 */
export type ImageCropInput = {
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height: Scalars['Int'];
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width: Scalars['Int'];
  /** The x coordinate of the image. The value must be an integer from 0 to 10000. */
  x: Scalars['Int'];
  /** The y coordinate of the image. The value must be an integer from 0 to 10000. */
  y: Scalars['Int'];
};

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
  Crop = 'crop',
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
  Max = 'max',
  /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
  Scale = 'scale'
}

export type ImageQualityInput = {
  /** The quality of the image. The value must be an integer from 1 to 100. */
  value: Scalars['Int'];
};

export type ImageResizeInput = {
  /** The default value for the fit parameter is fit:clip. */
  fit?: InputMaybe<ImageFit>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: InputMaybe<Scalars['Int']>;
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: InputMaybe<Scalars['Int']>;
};

export type ImageSharpenInput = {
  /** The amount of sharpening to apply to the image. The value must be an integer from 1 to 20. */
  amount: Scalars['Int'];
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Blurs the image. */
  blur?: InputMaybe<ImageBlurInput>;
  /** Adds a border to the image. */
  border?: InputMaybe<ImageBorderInput>;
  /** Compresses the image. */
  compress?: InputMaybe<ImageCompressInput>;
  /** Crops the image to the specified dimensions. */
  crop?: InputMaybe<ImageCropInput>;
  /**
   * Changes the quality of the image. The value must be an integer from 1 to 100.
   * Only supported for the following formats jpeg, jpg, webp, gif, heif, tiff, avif.
   */
  quality?: InputMaybe<ImageQualityInput>;
  /** Resizes the image */
  resize?: InputMaybe<ImageResizeInput>;
  /** Sharpens the image. */
  sharpen?: InputMaybe<ImageSharpenInput>;
};

/** Locale system enumeration */
export enum Locale {
  /** System locale */
  En = 'en'
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  __typename?: 'Location';
  distance: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};


/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput;
};

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Member = Entity & Node & {
  __typename?: 'Member';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Member>;
  /** List of Member versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  matriculaSiape: Scalars['Int'];
  name: Scalars['String'];
  ordinanceMember: Array<OrdinanceMember>;
  ordinances: Array<MemberOrdinances>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type MemberCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type MemberDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type MemberHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type MemberOrdinanceMemberArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrdinanceMemberWhereInput>;
};


export type MemberOrdinancesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type MemberPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type MemberScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type MemberUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type MemberConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: MemberWhereUniqueInput;
};

/** A connection to a list of items. */
export type MemberConnection = {
  __typename?: 'MemberConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<MemberEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type MemberCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  matriculaSiape: Scalars['Int'];
  name: Scalars['String'];
  ordinanceMember?: InputMaybe<OrdinanceMemberCreateManyInlineInput>;
  ordinances?: InputMaybe<MemberOrdinancesCreateManyInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MemberCreateManyInlineInput = {
  /** Connect multiple existing Member documents */
  connect?: InputMaybe<Array<MemberWhereUniqueInput>>;
  /** Create and connect multiple existing Member documents */
  create?: InputMaybe<Array<MemberCreateInput>>;
};

export type MemberCreateOneInlineInput = {
  /** Connect one existing Member document */
  connect?: InputMaybe<MemberWhereUniqueInput>;
  /** Create and connect one Member document */
  create?: InputMaybe<MemberCreateInput>;
};

/** An edge in a connection. */
export type MemberEdge = {
  __typename?: 'MemberEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Member;
};

/** Identifies documents */
export type MemberManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<MemberWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<MemberWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<MemberWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<MemberWhereStageInput>;
  documentInStages_none?: InputMaybe<MemberWhereStageInput>;
  documentInStages_some?: InputMaybe<MemberWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  matriculaSiape?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  matriculaSiape_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  matriculaSiape_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  matriculaSiape_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  matriculaSiape_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  matriculaSiape_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  matriculaSiape_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  matriculaSiape_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  ordinanceMember_every?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceMember_none?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceMember_some?: InputMaybe<OrdinanceMemberWhereInput>;
  /** All values in which the union is empty */
  ordinances_empty?: InputMaybe<Scalars['Boolean']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  ordinances_some?: InputMaybe<MemberOrdinancesWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum MemberOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MatriculaSiapeAsc = 'matriculaSiape_ASC',
  MatriculaSiapeDesc = 'matriculaSiape_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MemberOrdinances = Ordinance;

export type MemberOrdinancesConnectInput = {
  Ordinance?: InputMaybe<OrdinanceConnectInput>;
};

export type MemberOrdinancesCreateInput = {
  Ordinance?: InputMaybe<OrdinanceCreateInput>;
};

export type MemberOrdinancesCreateManyInlineInput = {
  /** Connect multiple existing MemberOrdinances documents */
  connect?: InputMaybe<Array<MemberOrdinancesWhereUniqueInput>>;
  /** Create and connect multiple existing MemberOrdinances documents */
  create?: InputMaybe<Array<MemberOrdinancesCreateInput>>;
};

export type MemberOrdinancesCreateOneInlineInput = {
  /** Connect one existing MemberOrdinances document */
  connect?: InputMaybe<MemberOrdinancesWhereUniqueInput>;
  /** Create and connect one MemberOrdinances document */
  create?: InputMaybe<MemberOrdinancesCreateInput>;
};

export type MemberOrdinancesUpdateInput = {
  Ordinance?: InputMaybe<OrdinanceUpdateInput>;
};

export type MemberOrdinancesUpdateManyInlineInput = {
  /** Connect multiple existing MemberOrdinances documents */
  connect?: InputMaybe<Array<MemberOrdinancesConnectInput>>;
  /** Create and connect multiple MemberOrdinances documents */
  create?: InputMaybe<Array<MemberOrdinancesCreateInput>>;
  /** Delete multiple MemberOrdinances documents */
  delete?: InputMaybe<Array<MemberOrdinancesWhereUniqueInput>>;
  /** Disconnect multiple MemberOrdinances documents */
  disconnect?: InputMaybe<Array<MemberOrdinancesWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing MemberOrdinances documents */
  set?: InputMaybe<Array<MemberOrdinancesWhereUniqueInput>>;
  /** Update multiple MemberOrdinances documents */
  update?: InputMaybe<Array<MemberOrdinancesUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple MemberOrdinances documents */
  upsert?: InputMaybe<Array<MemberOrdinancesUpsertWithNestedWhereUniqueInput>>;
};

export type MemberOrdinancesUpdateManyWithNestedWhereInput = {
  Ordinance?: InputMaybe<OrdinanceUpdateManyWithNestedWhereInput>;
};

export type MemberOrdinancesUpdateOneInlineInput = {
  /** Connect existing MemberOrdinances document */
  connect?: InputMaybe<MemberOrdinancesWhereUniqueInput>;
  /** Create and connect one MemberOrdinances document */
  create?: InputMaybe<MemberOrdinancesCreateInput>;
  /** Delete currently connected MemberOrdinances document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected MemberOrdinances document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single MemberOrdinances document */
  update?: InputMaybe<MemberOrdinancesUpdateWithNestedWhereUniqueInput>;
  /** Upsert single MemberOrdinances document */
  upsert?: InputMaybe<MemberOrdinancesUpsertWithNestedWhereUniqueInput>;
};

export type MemberOrdinancesUpdateWithNestedWhereUniqueInput = {
  Ordinance?: InputMaybe<OrdinanceUpdateWithNestedWhereUniqueInput>;
};

export type MemberOrdinancesUpsertWithNestedWhereUniqueInput = {
  Ordinance?: InputMaybe<OrdinanceUpsertWithNestedWhereUniqueInput>;
};

export type MemberOrdinancesWhereInput = {
  Ordinance?: InputMaybe<OrdinanceWhereInput>;
};

export type MemberOrdinancesWhereUniqueInput = {
  Ordinance?: InputMaybe<OrdinanceWhereUniqueInput>;
};

export enum MemberType {
  Member = 'member',
  President = 'president',
  VicePresident = 'vicePresident'
}

export type MemberUpdateInput = {
  matriculaSiape?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  ordinanceMember?: InputMaybe<OrdinanceMemberUpdateManyInlineInput>;
  ordinances?: InputMaybe<MemberOrdinancesUpdateManyInlineInput>;
};

export type MemberUpdateManyInlineInput = {
  /** Connect multiple existing Member documents */
  connect?: InputMaybe<Array<MemberConnectInput>>;
  /** Create and connect multiple Member documents */
  create?: InputMaybe<Array<MemberCreateInput>>;
  /** Delete multiple Member documents */
  delete?: InputMaybe<Array<MemberWhereUniqueInput>>;
  /** Disconnect multiple Member documents */
  disconnect?: InputMaybe<Array<MemberWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Member documents */
  set?: InputMaybe<Array<MemberWhereUniqueInput>>;
  /** Update multiple Member documents */
  update?: InputMaybe<Array<MemberUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Member documents */
  upsert?: InputMaybe<Array<MemberUpsertWithNestedWhereUniqueInput>>;
};

export type MemberUpdateManyInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type MemberUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: MemberUpdateManyInput;
  /** Document search */
  where: MemberWhereInput;
};

export type MemberUpdateOneInlineInput = {
  /** Connect existing Member document */
  connect?: InputMaybe<MemberWhereUniqueInput>;
  /** Create and connect one Member document */
  create?: InputMaybe<MemberCreateInput>;
  /** Delete currently connected Member document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Member document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Member document */
  update?: InputMaybe<MemberUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Member document */
  upsert?: InputMaybe<MemberUpsertWithNestedWhereUniqueInput>;
};

export type MemberUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: MemberUpdateInput;
  /** Unique document search */
  where: MemberWhereUniqueInput;
};

export type MemberUpsertInput = {
  /** Create document if it didn't exist */
  create: MemberCreateInput;
  /** Update document if it exists */
  update: MemberUpdateInput;
};

export type MemberUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: MemberUpsertInput;
  /** Unique document search */
  where: MemberWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type MemberWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type MemberWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<MemberWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<MemberWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<MemberWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<MemberWhereStageInput>;
  documentInStages_none?: InputMaybe<MemberWhereStageInput>;
  documentInStages_some?: InputMaybe<MemberWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  matriculaSiape?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  matriculaSiape_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  matriculaSiape_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  matriculaSiape_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  matriculaSiape_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  matriculaSiape_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  matriculaSiape_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  matriculaSiape_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  ordinanceMember_every?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceMember_none?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceMember_some?: InputMaybe<OrdinanceMemberWhereInput>;
  /** All values in which the union is empty */
  ordinances_empty?: InputMaybe<Scalars['Boolean']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  ordinances_some?: InputMaybe<MemberOrdinancesWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type MemberWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<MemberWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<MemberWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<MemberWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<MemberWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Member record uniquely */
export type MemberWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  matriculaSiape?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create an asset. Use the returned info to finish the creation process by uploading the asset. */
  createAsset?: Maybe<Asset>;
  /** Create one member */
  createMember?: Maybe<Member>;
  /** Create one ordinance */
  createOrdinance?: Maybe<Ordinance>;
  /** Create one ordinanceMember */
  createOrdinanceMember?: Maybe<OrdinanceMember>;
  /** Create one scheduledRelease */
  createScheduledRelease?: Maybe<ScheduledRelease>;
  /** Create one userAdmin */
  createUserAdmin?: Maybe<UserAdmin>;
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<Asset>;
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  deleteManyAssets: BatchPayload;
  /** Delete many Asset documents, return deleted documents */
  deleteManyAssetsConnection: AssetConnection;
  /**
   * Delete many Member documents
   * @deprecated Please use the new paginated many mutation (deleteManyMembersConnection)
   */
  deleteManyMembers: BatchPayload;
  /** Delete many Member documents, return deleted documents */
  deleteManyMembersConnection: MemberConnection;
  /**
   * Delete many OrdinanceMember documents
   * @deprecated Please use the new paginated many mutation (deleteManyOrdinanceMembersConnection)
   */
  deleteManyOrdinanceMembers: BatchPayload;
  /** Delete many OrdinanceMember documents, return deleted documents */
  deleteManyOrdinanceMembersConnection: OrdinanceMemberConnection;
  /**
   * Delete many Ordinance documents
   * @deprecated Please use the new paginated many mutation (deleteManyOrdinancesConnection)
   */
  deleteManyOrdinances: BatchPayload;
  /** Delete many Ordinance documents, return deleted documents */
  deleteManyOrdinancesConnection: OrdinanceConnection;
  /**
   * Delete many UserAdmin documents
   * @deprecated Please use the new paginated many mutation (deleteManyUserAdminsConnection)
   */
  deleteManyUserAdmins: BatchPayload;
  /** Delete many UserAdmin documents, return deleted documents */
  deleteManyUserAdminsConnection: UserAdminConnection;
  /** Delete one member from _all_ existing stages. Returns deleted document. */
  deleteMember?: Maybe<Member>;
  /** Delete one ordinance from _all_ existing stages. Returns deleted document. */
  deleteOrdinance?: Maybe<Ordinance>;
  /** Delete one ordinanceMember from _all_ existing stages. Returns deleted document. */
  deleteOrdinanceMember?: Maybe<OrdinanceMember>;
  /** Delete and return scheduled operation */
  deleteScheduledOperation?: Maybe<ScheduledOperation>;
  /** Delete one scheduledRelease from _all_ existing stages. Returns deleted document. */
  deleteScheduledRelease?: Maybe<ScheduledRelease>;
  /** Delete one userAdmin from _all_ existing stages. Returns deleted document. */
  deleteUserAdmin?: Maybe<UserAdmin>;
  /** Publish one asset */
  publishAsset?: Maybe<Asset>;
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  publishManyAssets: BatchPayload;
  /** Publish many Asset documents */
  publishManyAssetsConnection: AssetConnection;
  /**
   * Publish many Member documents
   * @deprecated Please use the new paginated many mutation (publishManyMembersConnection)
   */
  publishManyMembers: BatchPayload;
  /** Publish many Member documents */
  publishManyMembersConnection: MemberConnection;
  /**
   * Publish many OrdinanceMember documents
   * @deprecated Please use the new paginated many mutation (publishManyOrdinanceMembersConnection)
   */
  publishManyOrdinanceMembers: BatchPayload;
  /** Publish many OrdinanceMember documents */
  publishManyOrdinanceMembersConnection: OrdinanceMemberConnection;
  /**
   * Publish many Ordinance documents
   * @deprecated Please use the new paginated many mutation (publishManyOrdinancesConnection)
   */
  publishManyOrdinances: BatchPayload;
  /** Publish many Ordinance documents */
  publishManyOrdinancesConnection: OrdinanceConnection;
  /**
   * Publish many UserAdmin documents
   * @deprecated Please use the new paginated many mutation (publishManyUserAdminsConnection)
   */
  publishManyUserAdmins: BatchPayload;
  /** Publish many UserAdmin documents */
  publishManyUserAdminsConnection: UserAdminConnection;
  /** Publish one member */
  publishMember?: Maybe<Member>;
  /** Publish one ordinance */
  publishOrdinance?: Maybe<Ordinance>;
  /** Publish one ordinanceMember */
  publishOrdinanceMember?: Maybe<OrdinanceMember>;
  /** Publish one userAdmin */
  publishUserAdmin?: Maybe<UserAdmin>;
  /** Schedule to publish one asset */
  schedulePublishAsset?: Maybe<Asset>;
  /** Schedule to publish one member */
  schedulePublishMember?: Maybe<Member>;
  /** Schedule to publish one ordinance */
  schedulePublishOrdinance?: Maybe<Ordinance>;
  /** Schedule to publish one ordinanceMember */
  schedulePublishOrdinanceMember?: Maybe<OrdinanceMember>;
  /** Schedule to publish one userAdmin */
  schedulePublishUserAdmin?: Maybe<UserAdmin>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAsset?: Maybe<Asset>;
  /** Unpublish one member from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishMember?: Maybe<Member>;
  /** Unpublish one ordinance from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishOrdinance?: Maybe<Ordinance>;
  /** Unpublish one ordinanceMember from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishOrdinanceMember?: Maybe<OrdinanceMember>;
  /** Unpublish one userAdmin from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishUserAdmin?: Maybe<UserAdmin>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAsset?: Maybe<Asset>;
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  unpublishManyAssets: BatchPayload;
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAssetsConnection: AssetConnection;
  /**
   * Unpublish many Member documents
   * @deprecated Please use the new paginated many mutation (unpublishManyMembersConnection)
   */
  unpublishManyMembers: BatchPayload;
  /** Find many Member documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyMembersConnection: MemberConnection;
  /**
   * Unpublish many OrdinanceMember documents
   * @deprecated Please use the new paginated many mutation (unpublishManyOrdinanceMembersConnection)
   */
  unpublishManyOrdinanceMembers: BatchPayload;
  /** Find many OrdinanceMember documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyOrdinanceMembersConnection: OrdinanceMemberConnection;
  /**
   * Unpublish many Ordinance documents
   * @deprecated Please use the new paginated many mutation (unpublishManyOrdinancesConnection)
   */
  unpublishManyOrdinances: BatchPayload;
  /** Find many Ordinance documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyOrdinancesConnection: OrdinanceConnection;
  /**
   * Unpublish many UserAdmin documents
   * @deprecated Please use the new paginated many mutation (unpublishManyUserAdminsConnection)
   */
  unpublishManyUserAdmins: BatchPayload;
  /** Find many UserAdmin documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyUserAdminsConnection: UserAdminConnection;
  /** Unpublish one member from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishMember?: Maybe<Member>;
  /** Unpublish one ordinance from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishOrdinance?: Maybe<Ordinance>;
  /** Unpublish one ordinanceMember from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishOrdinanceMember?: Maybe<OrdinanceMember>;
  /** Unpublish one userAdmin from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishUserAdmin?: Maybe<UserAdmin>;
  /** Update one asset */
  updateAsset?: Maybe<Asset>;
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  updateManyAssets: BatchPayload;
  /** Update many Asset documents */
  updateManyAssetsConnection: AssetConnection;
  /**
   * Update many members
   * @deprecated Please use the new paginated many mutation (updateManyMembersConnection)
   */
  updateManyMembers: BatchPayload;
  /** Update many Member documents */
  updateManyMembersConnection: MemberConnection;
  /**
   * Update many ordinanceMembers
   * @deprecated Please use the new paginated many mutation (updateManyOrdinanceMembersConnection)
   */
  updateManyOrdinanceMembers: BatchPayload;
  /** Update many OrdinanceMember documents */
  updateManyOrdinanceMembersConnection: OrdinanceMemberConnection;
  /**
   * Update many ordinances
   * @deprecated Please use the new paginated many mutation (updateManyOrdinancesConnection)
   */
  updateManyOrdinances: BatchPayload;
  /** Update many Ordinance documents */
  updateManyOrdinancesConnection: OrdinanceConnection;
  /**
   * Update many userAdmins
   * @deprecated Please use the new paginated many mutation (updateManyUserAdminsConnection)
   */
  updateManyUserAdmins: BatchPayload;
  /** Update many UserAdmin documents */
  updateManyUserAdminsConnection: UserAdminConnection;
  /** Update one member */
  updateMember?: Maybe<Member>;
  /** Update one ordinance */
  updateOrdinance?: Maybe<Ordinance>;
  /** Update one ordinanceMember */
  updateOrdinanceMember?: Maybe<OrdinanceMember>;
  /** Update one scheduledRelease */
  updateScheduledRelease?: Maybe<ScheduledRelease>;
  /** Update one userAdmin */
  updateUserAdmin?: Maybe<UserAdmin>;
  /** Upsert one asset */
  upsertAsset?: Maybe<Asset>;
  /** Upsert one member */
  upsertMember?: Maybe<Member>;
  /** Upsert one ordinance */
  upsertOrdinance?: Maybe<Ordinance>;
  /** Upsert one ordinanceMember */
  upsertOrdinanceMember?: Maybe<OrdinanceMember>;
  /** Upsert one userAdmin */
  upsertUserAdmin?: Maybe<UserAdmin>;
};


export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};


export type MutationCreateMemberArgs = {
  data: MemberCreateInput;
};


export type MutationCreateOrdinanceArgs = {
  data: OrdinanceCreateInput;
};


export type MutationCreateOrdinanceMemberArgs = {
  data: OrdinanceMemberCreateInput;
};


export type MutationCreateScheduledReleaseArgs = {
  data: ScheduledReleaseCreateInput;
};


export type MutationCreateUserAdminArgs = {
  data: UserAdminCreateInput;
};


export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};


export type MutationDeleteManyAssetsArgs = {
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyMembersArgs = {
  where?: InputMaybe<MemberManyWhereInput>;
};


export type MutationDeleteManyMembersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MemberManyWhereInput>;
};


export type MutationDeleteManyOrdinanceMembersArgs = {
  where?: InputMaybe<OrdinanceMemberManyWhereInput>;
};


export type MutationDeleteManyOrdinanceMembersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrdinanceMemberManyWhereInput>;
};


export type MutationDeleteManyOrdinancesArgs = {
  where?: InputMaybe<OrdinanceManyWhereInput>;
};


export type MutationDeleteManyOrdinancesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrdinanceManyWhereInput>;
};


export type MutationDeleteManyUserAdminsArgs = {
  where?: InputMaybe<UserAdminManyWhereInput>;
};


export type MutationDeleteManyUserAdminsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserAdminManyWhereInput>;
};


export type MutationDeleteMemberArgs = {
  where: MemberWhereUniqueInput;
};


export type MutationDeleteOrdinanceArgs = {
  where: OrdinanceWhereUniqueInput;
};


export type MutationDeleteOrdinanceMemberArgs = {
  where: OrdinanceMemberWhereUniqueInput;
};


export type MutationDeleteScheduledOperationArgs = {
  where: ScheduledOperationWhereUniqueInput;
};


export type MutationDeleteScheduledReleaseArgs = {
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationDeleteUserAdminArgs = {
  where: UserAdminWhereUniqueInput;
};


export type MutationPublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyAssetsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyMembersArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<MemberManyWhereInput>;
};


export type MutationPublishManyMembersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<MemberManyWhereInput>;
};


export type MutationPublishManyOrdinanceMembersArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<OrdinanceMemberManyWhereInput>;
};


export type MutationPublishManyOrdinanceMembersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<OrdinanceMemberManyWhereInput>;
};


export type MutationPublishManyOrdinancesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<OrdinanceManyWhereInput>;
};


export type MutationPublishManyOrdinancesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<OrdinanceManyWhereInput>;
};


export type MutationPublishManyUserAdminsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<UserAdminManyWhereInput>;
};


export type MutationPublishManyUserAdminsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<UserAdminManyWhereInput>;
};


export type MutationPublishMemberArgs = {
  to?: Array<Stage>;
  where: MemberWhereUniqueInput;
};


export type MutationPublishOrdinanceArgs = {
  to?: Array<Stage>;
  where: OrdinanceWhereUniqueInput;
};


export type MutationPublishOrdinanceMemberArgs = {
  to?: Array<Stage>;
  where: OrdinanceMemberWhereUniqueInput;
};


export type MutationPublishUserAdminArgs = {
  to?: Array<Stage>;
  where: UserAdminWhereUniqueInput;
};


export type MutationSchedulePublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSchedulePublishMemberArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: MemberWhereUniqueInput;
};


export type MutationSchedulePublishOrdinanceArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: OrdinanceWhereUniqueInput;
};


export type MutationSchedulePublishOrdinanceMemberArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: OrdinanceMemberWhereUniqueInput;
};


export type MutationSchedulePublishUserAdminArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: UserAdminWhereUniqueInput;
};


export type MutationScheduleUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationScheduleUnpublishMemberArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: MemberWhereUniqueInput;
};


export type MutationScheduleUnpublishOrdinanceArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: OrdinanceWhereUniqueInput;
};


export type MutationScheduleUnpublishOrdinanceMemberArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: OrdinanceMemberWhereUniqueInput;
};


export type MutationScheduleUnpublishUserAdminArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: UserAdminWhereUniqueInput;
};


export type MutationUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationUnpublishManyAssetsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyMembersArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<MemberManyWhereInput>;
};


export type MutationUnpublishManyMembersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<MemberManyWhereInput>;
};


export type MutationUnpublishManyOrdinanceMembersArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<OrdinanceMemberManyWhereInput>;
};


export type MutationUnpublishManyOrdinanceMembersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<OrdinanceMemberManyWhereInput>;
};


export type MutationUnpublishManyOrdinancesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<OrdinanceManyWhereInput>;
};


export type MutationUnpublishManyOrdinancesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<OrdinanceManyWhereInput>;
};


export type MutationUnpublishManyUserAdminsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<UserAdminManyWhereInput>;
};


export type MutationUnpublishManyUserAdminsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<UserAdminManyWhereInput>;
};


export type MutationUnpublishMemberArgs = {
  from?: Array<Stage>;
  where: MemberWhereUniqueInput;
};


export type MutationUnpublishOrdinanceArgs = {
  from?: Array<Stage>;
  where: OrdinanceWhereUniqueInput;
};


export type MutationUnpublishOrdinanceMemberArgs = {
  from?: Array<Stage>;
  where: OrdinanceMemberWhereUniqueInput;
};


export type MutationUnpublishUserAdminArgs = {
  from?: Array<Stage>;
  where: UserAdminWhereUniqueInput;
};


export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyInput;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AssetUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyMembersArgs = {
  data: MemberUpdateManyInput;
  where?: InputMaybe<MemberManyWhereInput>;
};


export type MutationUpdateManyMembersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: MemberUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MemberManyWhereInput>;
};


export type MutationUpdateManyOrdinanceMembersArgs = {
  data: OrdinanceMemberUpdateManyInput;
  where?: InputMaybe<OrdinanceMemberManyWhereInput>;
};


export type MutationUpdateManyOrdinanceMembersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: OrdinanceMemberUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrdinanceMemberManyWhereInput>;
};


export type MutationUpdateManyOrdinancesArgs = {
  data: OrdinanceUpdateManyInput;
  where?: InputMaybe<OrdinanceManyWhereInput>;
};


export type MutationUpdateManyOrdinancesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: OrdinanceUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrdinanceManyWhereInput>;
};


export type MutationUpdateManyUserAdminsArgs = {
  data: UserAdminUpdateManyInput;
  where?: InputMaybe<UserAdminManyWhereInput>;
};


export type MutationUpdateManyUserAdminsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: UserAdminUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserAdminManyWhereInput>;
};


export type MutationUpdateMemberArgs = {
  data: MemberUpdateInput;
  where: MemberWhereUniqueInput;
};


export type MutationUpdateOrdinanceArgs = {
  data: OrdinanceUpdateInput;
  where: OrdinanceWhereUniqueInput;
};


export type MutationUpdateOrdinanceMemberArgs = {
  data: OrdinanceMemberUpdateInput;
  where: OrdinanceMemberWhereUniqueInput;
};


export type MutationUpdateScheduledReleaseArgs = {
  data: ScheduledReleaseUpdateInput;
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationUpdateUserAdminArgs = {
  data: UserAdminUpdateInput;
  where: UserAdminWhereUniqueInput;
};


export type MutationUpsertAssetArgs = {
  upsert: AssetUpsertInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpsertMemberArgs = {
  upsert: MemberUpsertInput;
  where: MemberWhereUniqueInput;
};


export type MutationUpsertOrdinanceArgs = {
  upsert: OrdinanceUpsertInput;
  where: OrdinanceWhereUniqueInput;
};


export type MutationUpsertOrdinanceMemberArgs = {
  upsert: OrdinanceMemberUpsertInput;
  where: OrdinanceMemberWhereUniqueInput;
};


export type MutationUpsertUserAdminArgs = {
  upsert: UserAdminUpsertInput;
  where: UserAdminWhereUniqueInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
  /** The Stage of an object */
  stage: Stage;
};

export enum Occupation {
  Member = 'member',
  President = 'president'
}

export type Ordinance = Entity & Node & {
  __typename?: 'Ordinance';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Ordinance>;
  effectiveEndDate?: Maybe<Scalars['Date']>;
  effectiveStartDate: Scalars['Date'];
  /** List of Ordinance versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  members: Array<Member>;
  number: Scalars['String'];
  ordinanceMember: Array<OrdinanceMember>;
  ordinanceSituation?: Maybe<OrdinanceSituation>;
  ordinanceType: OrdinanceType;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** Assunto da portaria */
  subject: Scalars['String'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type OrdinanceCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type OrdinanceDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type OrdinanceHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type OrdinanceMembersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MemberWhereInput>;
};


export type OrdinanceOrdinanceMemberArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrdinanceMemberWhereInput>;
};


export type OrdinancePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type OrdinanceScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type OrdinanceUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type OrdinanceConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: OrdinanceWhereUniqueInput;
};

/** A connection to a list of items. */
export type OrdinanceConnection = {
  __typename?: 'OrdinanceConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<OrdinanceEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type OrdinanceCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  effectiveEndDate?: InputMaybe<Scalars['Date']>;
  effectiveStartDate: Scalars['Date'];
  members?: InputMaybe<MemberCreateManyInlineInput>;
  number: Scalars['String'];
  ordinanceMember?: InputMaybe<OrdinanceMemberCreateManyInlineInput>;
  ordinanceSituation?: InputMaybe<OrdinanceSituation>;
  ordinanceType: OrdinanceType;
  subject: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type OrdinanceCreateManyInlineInput = {
  /** Connect multiple existing Ordinance documents */
  connect?: InputMaybe<Array<OrdinanceWhereUniqueInput>>;
  /** Create and connect multiple existing Ordinance documents */
  create?: InputMaybe<Array<OrdinanceCreateInput>>;
};

export type OrdinanceCreateOneInlineInput = {
  /** Connect one existing Ordinance document */
  connect?: InputMaybe<OrdinanceWhereUniqueInput>;
  /** Create and connect one Ordinance document */
  create?: InputMaybe<OrdinanceCreateInput>;
};

/** An edge in a connection. */
export type OrdinanceEdge = {
  __typename?: 'OrdinanceEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Ordinance;
};

/** Identifies documents */
export type OrdinanceManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<OrdinanceWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<OrdinanceWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<OrdinanceWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<OrdinanceWhereStageInput>;
  documentInStages_none?: InputMaybe<OrdinanceWhereStageInput>;
  documentInStages_some?: InputMaybe<OrdinanceWhereStageInput>;
  effectiveEndDate?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  effectiveEndDate_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  effectiveEndDate_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  effectiveEndDate_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  effectiveEndDate_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  effectiveEndDate_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  effectiveEndDate_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  effectiveEndDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  effectiveStartDate?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  effectiveStartDate_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  effectiveStartDate_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  effectiveStartDate_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  effectiveStartDate_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  effectiveStartDate_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  effectiveStartDate_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  effectiveStartDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  members_every?: InputMaybe<MemberWhereInput>;
  members_none?: InputMaybe<MemberWhereInput>;
  members_some?: InputMaybe<MemberWhereInput>;
  number?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  number_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  number_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  number_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  number_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  number_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  number_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  number_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  number_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  number_starts_with?: InputMaybe<Scalars['String']>;
  ordinanceMember_every?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceMember_none?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceMember_some?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceSituation?: InputMaybe<OrdinanceSituation>;
  /** All values that are contained in given list. */
  ordinanceSituation_in?: InputMaybe<Array<InputMaybe<OrdinanceSituation>>>;
  /** Any other value that exists and is not equal to the given value. */
  ordinanceSituation_not?: InputMaybe<OrdinanceSituation>;
  /** All values that are not contained in given list. */
  ordinanceSituation_not_in?: InputMaybe<Array<InputMaybe<OrdinanceSituation>>>;
  ordinanceType?: InputMaybe<OrdinanceType>;
  /** All values that are contained in given list. */
  ordinanceType_in?: InputMaybe<Array<InputMaybe<OrdinanceType>>>;
  /** Any other value that exists and is not equal to the given value. */
  ordinanceType_not?: InputMaybe<OrdinanceType>;
  /** All values that are not contained in given list. */
  ordinanceType_not_in?: InputMaybe<Array<InputMaybe<OrdinanceType>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  subject?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  subject_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  subject_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  subject_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  subject_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  subject_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  subject_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  subject_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  subject_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  subject_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export type OrdinanceMember = Entity & Node & {
  __typename?: 'OrdinanceMember';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<OrdinanceMember>;
  /** List of OrdinanceMember versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  memberType?: Maybe<MemberType>;
  memberWorkload: Array<OrdinanceMemberMemberWorkload>;
  ordinanceWorkload: Array<OrdinanceMemberOrdinanceMember>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  workload: Scalars['Int'];
};


export type OrdinanceMemberCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type OrdinanceMemberDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type OrdinanceMemberHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type OrdinanceMemberMemberWorkloadArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type OrdinanceMemberOrdinanceWorkloadArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type OrdinanceMemberPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type OrdinanceMemberScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type OrdinanceMemberUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type OrdinanceMemberConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: OrdinanceMemberWhereUniqueInput;
};

/** A connection to a list of items. */
export type OrdinanceMemberConnection = {
  __typename?: 'OrdinanceMemberConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<OrdinanceMemberEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type OrdinanceMemberCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  memberType?: InputMaybe<MemberType>;
  memberWorkload?: InputMaybe<OrdinanceMemberMemberWorkloadCreateManyInlineInput>;
  ordinanceWorkload?: InputMaybe<OrdinanceMemberOrdinanceMemberCreateManyInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  workload: Scalars['Int'];
};

export type OrdinanceMemberCreateManyInlineInput = {
  /** Connect multiple existing OrdinanceMember documents */
  connect?: InputMaybe<Array<OrdinanceMemberWhereUniqueInput>>;
  /** Create and connect multiple existing OrdinanceMember documents */
  create?: InputMaybe<Array<OrdinanceMemberCreateInput>>;
};

export type OrdinanceMemberCreateOneInlineInput = {
  /** Connect one existing OrdinanceMember document */
  connect?: InputMaybe<OrdinanceMemberWhereUniqueInput>;
  /** Create and connect one OrdinanceMember document */
  create?: InputMaybe<OrdinanceMemberCreateInput>;
};

/** An edge in a connection. */
export type OrdinanceMemberEdge = {
  __typename?: 'OrdinanceMemberEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: OrdinanceMember;
};

/** Identifies documents */
export type OrdinanceMemberManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<OrdinanceMemberWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<OrdinanceMemberWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<OrdinanceMemberWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<OrdinanceMemberWhereStageInput>;
  documentInStages_none?: InputMaybe<OrdinanceMemberWhereStageInput>;
  documentInStages_some?: InputMaybe<OrdinanceMemberWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  memberType?: InputMaybe<MemberType>;
  /** All values that are contained in given list. */
  memberType_in?: InputMaybe<Array<InputMaybe<MemberType>>>;
  /** Any other value that exists and is not equal to the given value. */
  memberType_not?: InputMaybe<MemberType>;
  /** All values that are not contained in given list. */
  memberType_not_in?: InputMaybe<Array<InputMaybe<MemberType>>>;
  /** All values in which the union is empty */
  memberWorkload_empty?: InputMaybe<Scalars['Boolean']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  memberWorkload_some?: InputMaybe<OrdinanceMemberMemberWorkloadWhereInput>;
  /** All values in which the union is empty */
  ordinanceWorkload_empty?: InputMaybe<Scalars['Boolean']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  ordinanceWorkload_some?: InputMaybe<OrdinanceMemberOrdinanceMemberWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  workload?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  workload_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  workload_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  workload_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  workload_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  workload_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  workload_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  workload_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export enum OrdinanceMemberOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MemberTypeAsc = 'memberType_ASC',
  MemberTypeDesc = 'memberType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkloadAsc = 'workload_ASC',
  WorkloadDesc = 'workload_DESC'
}

export type OrdinanceMemberUpdateInput = {
  memberType?: InputMaybe<MemberType>;
  memberWorkload?: InputMaybe<OrdinanceMemberMemberWorkloadUpdateManyInlineInput>;
  ordinanceWorkload?: InputMaybe<OrdinanceMemberOrdinanceMemberUpdateManyInlineInput>;
  workload?: InputMaybe<Scalars['Int']>;
};

export type OrdinanceMemberUpdateManyInlineInput = {
  /** Connect multiple existing OrdinanceMember documents */
  connect?: InputMaybe<Array<OrdinanceMemberConnectInput>>;
  /** Create and connect multiple OrdinanceMember documents */
  create?: InputMaybe<Array<OrdinanceMemberCreateInput>>;
  /** Delete multiple OrdinanceMember documents */
  delete?: InputMaybe<Array<OrdinanceMemberWhereUniqueInput>>;
  /** Disconnect multiple OrdinanceMember documents */
  disconnect?: InputMaybe<Array<OrdinanceMemberWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing OrdinanceMember documents */
  set?: InputMaybe<Array<OrdinanceMemberWhereUniqueInput>>;
  /** Update multiple OrdinanceMember documents */
  update?: InputMaybe<Array<OrdinanceMemberUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple OrdinanceMember documents */
  upsert?: InputMaybe<Array<OrdinanceMemberUpsertWithNestedWhereUniqueInput>>;
};

export type OrdinanceMemberUpdateManyInput = {
  memberType?: InputMaybe<MemberType>;
  workload?: InputMaybe<Scalars['Int']>;
};

export type OrdinanceMemberUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: OrdinanceMemberUpdateManyInput;
  /** Document search */
  where: OrdinanceMemberWhereInput;
};

export type OrdinanceMemberUpdateOneInlineInput = {
  /** Connect existing OrdinanceMember document */
  connect?: InputMaybe<OrdinanceMemberWhereUniqueInput>;
  /** Create and connect one OrdinanceMember document */
  create?: InputMaybe<OrdinanceMemberCreateInput>;
  /** Delete currently connected OrdinanceMember document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected OrdinanceMember document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single OrdinanceMember document */
  update?: InputMaybe<OrdinanceMemberUpdateWithNestedWhereUniqueInput>;
  /** Upsert single OrdinanceMember document */
  upsert?: InputMaybe<OrdinanceMemberUpsertWithNestedWhereUniqueInput>;
};

export type OrdinanceMemberUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: OrdinanceMemberUpdateInput;
  /** Unique document search */
  where: OrdinanceMemberWhereUniqueInput;
};

export type OrdinanceMemberUpsertInput = {
  /** Create document if it didn't exist */
  create: OrdinanceMemberCreateInput;
  /** Update document if it exists */
  update: OrdinanceMemberUpdateInput;
};

export type OrdinanceMemberUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: OrdinanceMemberUpsertInput;
  /** Unique document search */
  where: OrdinanceMemberWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type OrdinanceMemberWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type OrdinanceMemberWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<OrdinanceMemberWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<OrdinanceMemberWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<OrdinanceMemberWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<OrdinanceMemberWhereStageInput>;
  documentInStages_none?: InputMaybe<OrdinanceMemberWhereStageInput>;
  documentInStages_some?: InputMaybe<OrdinanceMemberWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  memberType?: InputMaybe<MemberType>;
  /** All values that are contained in given list. */
  memberType_in?: InputMaybe<Array<InputMaybe<MemberType>>>;
  /** Any other value that exists and is not equal to the given value. */
  memberType_not?: InputMaybe<MemberType>;
  /** All values that are not contained in given list. */
  memberType_not_in?: InputMaybe<Array<InputMaybe<MemberType>>>;
  /** All values in which the union is empty */
  memberWorkload_empty?: InputMaybe<Scalars['Boolean']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  memberWorkload_some?: InputMaybe<OrdinanceMemberMemberWorkloadWhereInput>;
  /** All values in which the union is empty */
  ordinanceWorkload_empty?: InputMaybe<Scalars['Boolean']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  ordinanceWorkload_some?: InputMaybe<OrdinanceMemberOrdinanceMemberWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  workload?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  workload_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  workload_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  workload_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  workload_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  workload_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  workload_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  workload_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type OrdinanceMemberWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<OrdinanceMemberWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<OrdinanceMemberWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<OrdinanceMemberWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<OrdinanceMemberWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References OrdinanceMember record uniquely */
export type OrdinanceMemberWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export enum OrdinanceOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EffectiveEndDateAsc = 'effectiveEndDate_ASC',
  EffectiveEndDateDesc = 'effectiveEndDate_DESC',
  EffectiveStartDateAsc = 'effectiveStartDate_ASC',
  EffectiveStartDateDesc = 'effectiveStartDate_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NumberAsc = 'number_ASC',
  NumberDesc = 'number_DESC',
  OrdinanceSituationAsc = 'ordinanceSituation_ASC',
  OrdinanceSituationDesc = 'ordinanceSituation_DESC',
  OrdinanceTypeAsc = 'ordinanceType_ASC',
  OrdinanceTypeDesc = 'ordinanceType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SubjectAsc = 'subject_ASC',
  SubjectDesc = 'subject_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export enum OrdinanceSituation {
  Revoked = 'revoked'
}

export enum OrdinanceType {
  Designation = 'designation',
  Progression = 'progression'
}

export type OrdinanceUpdateInput = {
  effectiveEndDate?: InputMaybe<Scalars['Date']>;
  effectiveStartDate?: InputMaybe<Scalars['Date']>;
  members?: InputMaybe<MemberUpdateManyInlineInput>;
  number?: InputMaybe<Scalars['String']>;
  ordinanceMember?: InputMaybe<OrdinanceMemberUpdateManyInlineInput>;
  ordinanceSituation?: InputMaybe<OrdinanceSituation>;
  ordinanceType?: InputMaybe<OrdinanceType>;
  subject?: InputMaybe<Scalars['String']>;
};

export type OrdinanceUpdateManyInlineInput = {
  /** Connect multiple existing Ordinance documents */
  connect?: InputMaybe<Array<OrdinanceConnectInput>>;
  /** Create and connect multiple Ordinance documents */
  create?: InputMaybe<Array<OrdinanceCreateInput>>;
  /** Delete multiple Ordinance documents */
  delete?: InputMaybe<Array<OrdinanceWhereUniqueInput>>;
  /** Disconnect multiple Ordinance documents */
  disconnect?: InputMaybe<Array<OrdinanceWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Ordinance documents */
  set?: InputMaybe<Array<OrdinanceWhereUniqueInput>>;
  /** Update multiple Ordinance documents */
  update?: InputMaybe<Array<OrdinanceUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Ordinance documents */
  upsert?: InputMaybe<Array<OrdinanceUpsertWithNestedWhereUniqueInput>>;
};

export type OrdinanceUpdateManyInput = {
  effectiveEndDate?: InputMaybe<Scalars['Date']>;
  effectiveStartDate?: InputMaybe<Scalars['Date']>;
  ordinanceSituation?: InputMaybe<OrdinanceSituation>;
  ordinanceType?: InputMaybe<OrdinanceType>;
  subject?: InputMaybe<Scalars['String']>;
};

export type OrdinanceUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: OrdinanceUpdateManyInput;
  /** Document search */
  where: OrdinanceWhereInput;
};

export type OrdinanceUpdateOneInlineInput = {
  /** Connect existing Ordinance document */
  connect?: InputMaybe<OrdinanceWhereUniqueInput>;
  /** Create and connect one Ordinance document */
  create?: InputMaybe<OrdinanceCreateInput>;
  /** Delete currently connected Ordinance document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Ordinance document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Ordinance document */
  update?: InputMaybe<OrdinanceUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Ordinance document */
  upsert?: InputMaybe<OrdinanceUpsertWithNestedWhereUniqueInput>;
};

export type OrdinanceUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: OrdinanceUpdateInput;
  /** Unique document search */
  where: OrdinanceWhereUniqueInput;
};

export type OrdinanceUpsertInput = {
  /** Create document if it didn't exist */
  create: OrdinanceCreateInput;
  /** Update document if it exists */
  update: OrdinanceUpdateInput;
};

export type OrdinanceUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: OrdinanceUpsertInput;
  /** Unique document search */
  where: OrdinanceWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type OrdinanceWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type OrdinanceWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<OrdinanceWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<OrdinanceWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<OrdinanceWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<OrdinanceWhereStageInput>;
  documentInStages_none?: InputMaybe<OrdinanceWhereStageInput>;
  documentInStages_some?: InputMaybe<OrdinanceWhereStageInput>;
  effectiveEndDate?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  effectiveEndDate_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  effectiveEndDate_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  effectiveEndDate_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  effectiveEndDate_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  effectiveEndDate_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  effectiveEndDate_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  effectiveEndDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  effectiveStartDate?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  effectiveStartDate_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  effectiveStartDate_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  effectiveStartDate_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  effectiveStartDate_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  effectiveStartDate_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  effectiveStartDate_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  effectiveStartDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  members_every?: InputMaybe<MemberWhereInput>;
  members_none?: InputMaybe<MemberWhereInput>;
  members_some?: InputMaybe<MemberWhereInput>;
  number?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  number_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  number_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  number_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  number_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  number_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  number_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  number_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  number_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  number_starts_with?: InputMaybe<Scalars['String']>;
  ordinanceMember_every?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceMember_none?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceMember_some?: InputMaybe<OrdinanceMemberWhereInput>;
  ordinanceSituation?: InputMaybe<OrdinanceSituation>;
  /** All values that are contained in given list. */
  ordinanceSituation_in?: InputMaybe<Array<InputMaybe<OrdinanceSituation>>>;
  /** Any other value that exists and is not equal to the given value. */
  ordinanceSituation_not?: InputMaybe<OrdinanceSituation>;
  /** All values that are not contained in given list. */
  ordinanceSituation_not_in?: InputMaybe<Array<InputMaybe<OrdinanceSituation>>>;
  ordinanceType?: InputMaybe<OrdinanceType>;
  /** All values that are contained in given list. */
  ordinanceType_in?: InputMaybe<Array<InputMaybe<OrdinanceType>>>;
  /** Any other value that exists and is not equal to the given value. */
  ordinanceType_not?: InputMaybe<OrdinanceType>;
  /** All values that are not contained in given list. */
  ordinanceType_not_in?: InputMaybe<Array<InputMaybe<OrdinanceType>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  subject?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  subject_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  subject_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  subject_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  subject_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  subject_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  subject_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  subject_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  subject_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  subject_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type OrdinanceWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<OrdinanceWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<OrdinanceWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<OrdinanceWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<OrdinanceWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Ordinance record uniquely */
export type OrdinanceWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  number?: InputMaybe<Scalars['String']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Number of items in the current page. */
  pageSize?: Maybe<Scalars['Int']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PublishLocaleInput = {
  /** Locales to publish */
  locale: Locale;
  /** Stages to publish selected locales to */
  stages: Array<Stage>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a single asset */
  asset?: Maybe<Asset>;
  /** Retrieve document version */
  assetVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple assets */
  assets: Array<Asset>;
  /** Retrieve multiple assets using the Relay connection interface */
  assetsConnection: AssetConnection;
  /** Fetches an object given its ID */
  entities?: Maybe<Array<Entity>>;
  /** Retrieve a single member */
  member?: Maybe<Member>;
  /** Retrieve document version */
  memberVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple members */
  members: Array<Member>;
  /** Retrieve multiple members using the Relay connection interface */
  membersConnection: MemberConnection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Retrieve a single ordinance */
  ordinance?: Maybe<Ordinance>;
  /** Retrieve a single ordinanceMember */
  ordinanceMember?: Maybe<OrdinanceMember>;
  /** Retrieve document version */
  ordinanceMemberVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple ordinanceMembers */
  ordinanceMembers: Array<OrdinanceMember>;
  /** Retrieve multiple ordinanceMembers using the Relay connection interface */
  ordinanceMembersConnection: OrdinanceMemberConnection;
  /** Retrieve document version */
  ordinanceVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple ordinances */
  ordinances: Array<Ordinance>;
  /** Retrieve multiple ordinances using the Relay connection interface */
  ordinancesConnection: OrdinanceConnection;
  /** Retrieve a single scheduledOperation */
  scheduledOperation?: Maybe<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations */
  scheduledOperations: Array<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations using the Relay connection interface */
  scheduledOperationsConnection: ScheduledOperationConnection;
  /** Retrieve a single scheduledRelease */
  scheduledRelease?: Maybe<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases */
  scheduledReleases: Array<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases using the Relay connection interface */
  scheduledReleasesConnection: ScheduledReleaseConnection;
  /** Retrieve a single user */
  user?: Maybe<User>;
  /** Retrieve a single userAdmin */
  userAdmin?: Maybe<UserAdmin>;
  /** Retrieve document version */
  userAdminVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple userAdmins */
  userAdmins: Array<UserAdmin>;
  /** Retrieve multiple userAdmins using the Relay connection interface */
  userAdminsConnection: UserAdminConnection;
  /** Retrieve multiple users */
  users: Array<User>;
  /** Retrieve multiple users using the Relay connection interface */
  usersConnection: UserConnection;
};


export type QueryAssetArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AssetWhereUniqueInput;
};


export type QueryAssetVersionArgs = {
  where: VersionWhereInput;
};


export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryEntitiesArgs = {
  locales?: InputMaybe<Array<Locale>>;
  where: Array<EntityWhereInput>;
};


export type QueryMemberArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: MemberWhereUniqueInput;
};


export type QueryMemberVersionArgs = {
  where: VersionWhereInput;
};


export type QueryMembersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<MemberOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<MemberWhereInput>;
};


export type QueryMembersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<MemberOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<MemberWhereInput>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
  locales?: Array<Locale>;
  stage?: Stage;
};


export type QueryOrdinanceArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: OrdinanceWhereUniqueInput;
};


export type QueryOrdinanceMemberArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: OrdinanceMemberWhereUniqueInput;
};


export type QueryOrdinanceMemberVersionArgs = {
  where: VersionWhereInput;
};


export type QueryOrdinanceMembersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<OrdinanceMemberOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OrdinanceMemberWhereInput>;
};


export type QueryOrdinanceMembersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<OrdinanceMemberOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OrdinanceMemberWhereInput>;
};


export type QueryOrdinanceVersionArgs = {
  where: VersionWhereInput;
};


export type QueryOrdinancesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<OrdinanceOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OrdinanceWhereInput>;
};


export type QueryOrdinancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<OrdinanceOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OrdinanceWhereInput>;
};


export type QueryScheduledOperationArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledOperationWhereUniqueInput;
};


export type QueryScheduledOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledOperationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledReleaseArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledReleaseWhereUniqueInput;
};


export type QueryScheduledReleasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QueryScheduledReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QueryUserArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: UserWhereUniqueInput;
};


export type QueryUserAdminArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: UserAdminWhereUniqueInput;
};


export type QueryUserAdminVersionArgs = {
  where: VersionWhereInput;
};


export type QueryUserAdminsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserAdminOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserAdminWhereInput>;
};


export type QueryUserAdminsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserAdminOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserAdminWhereInput>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  __typename?: 'RGBA';
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  __typename?: 'RichText';
  /** Returns HTMl representation */
  html: Scalars['String'];
  /** Returns Markdown representation */
  markdown: Scalars['String'];
  /** Returns AST representation */
  raw: Scalars['RichTextAST'];
  /** Returns plain-text contents of RichText */
  text: Scalars['String'];
};

/** Scheduled Operation system model */
export type ScheduledOperation = Entity & Node & {
  __typename?: 'ScheduledOperation';
  affectedDocuments: Array<ScheduledOperationAffectedDocument>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Operation description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledOperation>;
  /** Operation error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Raw operation payload including all details, this field is subject to change */
  rawPayload: Scalars['Json'];
  /** The release this operation is scheduled for */
  release?: Maybe<ScheduledRelease>;
  /** System stage field */
  stage: Stage;
  /** operation Status */
  status: ScheduledOperationStatus;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Operation system model */
export type ScheduledOperationAffectedDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** Scheduled Operation system model */
export type ScheduledOperationCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Scheduled Operation system model */
export type ScheduledOperationPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationReleaseArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledOperationAffectedDocument = Asset | Member | Ordinance | OrdinanceMember | UserAdmin;

export type ScheduledOperationConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledOperationWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledOperationConnection = {
  __typename?: 'ScheduledOperationConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledOperationEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledOperationCreateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationCreateOneInlineInput = {
  /** Connect one existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
};

/** An edge in a connection. */
export type ScheduledOperationEdge = {
  __typename?: 'ScheduledOperationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledOperation;
};

/** Identifies documents */
export type ScheduledOperationManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledOperationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Operation Status */
export enum ScheduledOperationStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledOperationUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationConnectInput>>;
  /** Disconnect multiple ScheduledOperation documents */
  disconnect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledOperation documents */
  set?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationUpdateOneInlineInput = {
  /** Connect existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
  /** Disconnect currently connected ScheduledOperation document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ScheduledOperationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledOperation record uniquely */
export type ScheduledOperationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Scheduled Release system model */
export type ScheduledRelease = Entity & Node & {
  __typename?: 'ScheduledRelease';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Release description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledRelease>;
  /** Release error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Whether scheduled release should be run */
  isActive: Scalars['Boolean'];
  /** Whether scheduled release is implicit */
  isImplicit: Scalars['Boolean'];
  /** Operations to run with this release */
  operations: Array<ScheduledOperation>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Release date and time */
  releaseAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** Release Status */
  status: ScheduledReleaseStatus;
  /** Release Title */
  title?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Release system model */
export type ScheduledReleaseCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Scheduled Release system model */
export type ScheduledReleaseOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Scheduled Release system model */
export type ScheduledReleasePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledReleaseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledReleaseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledReleaseConnection = {
  __typename?: 'ScheduledReleaseConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledReleaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledReleaseCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScheduledReleaseCreateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Create and connect multiple existing ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
};

export type ScheduledReleaseCreateOneInlineInput = {
  /** Connect one existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
};

/** An edge in a connection. */
export type ScheduledReleaseEdge = {
  __typename?: 'ScheduledReleaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledRelease;
};

/** Identifies documents */
export type ScheduledReleaseManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledReleaseOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  IsImplicitAsc = 'isImplicit_ASC',
  IsImplicitDesc = 'isImplicit_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ReleaseAtAsc = 'releaseAt_ASC',
  ReleaseAtDesc = 'releaseAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Release Status */
export enum ScheduledReleaseStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledReleaseUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseConnectInput>>;
  /** Create and connect multiple ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
  /** Delete multiple ScheduledRelease documents */
  delete?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Disconnect multiple ScheduledRelease documents */
  disconnect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledRelease documents */
  set?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Update multiple ScheduledRelease documents */
  update?: InputMaybe<Array<ScheduledReleaseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ScheduledRelease documents */
  upsert?: InputMaybe<Array<ScheduledReleaseUpsertWithNestedWhereUniqueInput>>;
};

export type ScheduledReleaseUpdateManyInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ScheduledReleaseUpdateManyInput;
  /** Document search */
  where: ScheduledReleaseWhereInput;
};

export type ScheduledReleaseUpdateOneInlineInput = {
  /** Connect existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
  /** Delete currently connected ScheduledRelease document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected ScheduledRelease document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single ScheduledRelease document */
  update?: InputMaybe<ScheduledReleaseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ScheduledRelease document */
  upsert?: InputMaybe<ScheduledReleaseUpsertWithNestedWhereUniqueInput>;
};

export type ScheduledReleaseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ScheduledReleaseUpdateInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

export type ScheduledReleaseUpsertInput = {
  /** Create document if it didn't exist */
  create: ScheduledReleaseCreateInput;
  /** Update document if it exists */
  update: ScheduledReleaseUpdateInput;
};

export type ScheduledReleaseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ScheduledReleaseUpsertInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

/** Identifies documents */
export type ScheduledReleaseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledRelease record uniquely */
export type ScheduledReleaseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Stage system enumeration */
export enum Stage {
  /** The Draft is the default stage for all your content. */
  Draft = 'DRAFT',
  /** The Published stage is where you can publish your content to. */
  Published = 'PUBLISHED'
}

export enum SystemDateTimeFieldVariation {
  Base = 'BASE',
  Combined = 'COMBINED',
  Localization = 'LOCALIZATION'
}

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: Locale;
  /** Stages to unpublish selected locales from */
  stages: Array<Stage>;
};

/** User system model */
export type User = Entity & Node & {
  __typename?: 'User';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** Get the document in other stages */
  documentInStages: Array<User>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Flag to determine if user is active or not */
  isActive: Scalars['Boolean'];
  /** User Kind. Can be either MEMBER, PAT or PUBLIC */
  kind: UserKind;
  /** The username */
  name: Scalars['String'];
  /** Profile Picture url */
  picture?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
};


/** User system model */
export type UserDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type UserAdmin = Entity & Node & {
  __typename?: 'UserAdmin';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<UserAdmin>;
  email: Scalars['String'];
  /** List of UserAdmin versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  userAdminType: UserAdminType;
};


export type UserAdminCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type UserAdminDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type UserAdminHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type UserAdminPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type UserAdminScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type UserAdminUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type UserAdminConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: UserAdminWhereUniqueInput;
};

/** A connection to a list of items. */
export type UserAdminConnection = {
  __typename?: 'UserAdminConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<UserAdminEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type UserAdminCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userAdminType: UserAdminType;
};

export type UserAdminCreateManyInlineInput = {
  /** Connect multiple existing UserAdmin documents */
  connect?: InputMaybe<Array<UserAdminWhereUniqueInput>>;
  /** Create and connect multiple existing UserAdmin documents */
  create?: InputMaybe<Array<UserAdminCreateInput>>;
};

export type UserAdminCreateOneInlineInput = {
  /** Connect one existing UserAdmin document */
  connect?: InputMaybe<UserAdminWhereUniqueInput>;
  /** Create and connect one UserAdmin document */
  create?: InputMaybe<UserAdminCreateInput>;
};

/** An edge in a connection. */
export type UserAdminEdge = {
  __typename?: 'UserAdminEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: UserAdmin;
};

/** Identifies documents */
export type UserAdminManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserAdminWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserAdminWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserAdminWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<UserAdminWhereStageInput>;
  documentInStages_none?: InputMaybe<UserAdminWhereStageInput>;
  documentInStages_some?: InputMaybe<UserAdminWhereStageInput>;
  email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  email_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  email_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  email_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  userAdminType?: InputMaybe<UserAdminType>;
  /** All values that are contained in given list. */
  userAdminType_in?: InputMaybe<Array<InputMaybe<UserAdminType>>>;
  /** Any other value that exists and is not equal to the given value. */
  userAdminType_not?: InputMaybe<UserAdminType>;
  /** All values that are not contained in given list. */
  userAdminType_not_in?: InputMaybe<Array<InputMaybe<UserAdminType>>>;
};

export enum UserAdminOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UserAdminTypeAsc = 'userAdminType_ASC',
  UserAdminTypeDesc = 'userAdminType_DESC'
}

export enum UserAdminType {
  Administrator = 'administrator',
  Collaborator = 'collaborator'
}

export type UserAdminUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  userAdminType?: InputMaybe<UserAdminType>;
};

export type UserAdminUpdateManyInlineInput = {
  /** Connect multiple existing UserAdmin documents */
  connect?: InputMaybe<Array<UserAdminConnectInput>>;
  /** Create and connect multiple UserAdmin documents */
  create?: InputMaybe<Array<UserAdminCreateInput>>;
  /** Delete multiple UserAdmin documents */
  delete?: InputMaybe<Array<UserAdminWhereUniqueInput>>;
  /** Disconnect multiple UserAdmin documents */
  disconnect?: InputMaybe<Array<UserAdminWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing UserAdmin documents */
  set?: InputMaybe<Array<UserAdminWhereUniqueInput>>;
  /** Update multiple UserAdmin documents */
  update?: InputMaybe<Array<UserAdminUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple UserAdmin documents */
  upsert?: InputMaybe<Array<UserAdminUpsertWithNestedWhereUniqueInput>>;
};

export type UserAdminUpdateManyInput = {
  userAdminType?: InputMaybe<UserAdminType>;
};

export type UserAdminUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: UserAdminUpdateManyInput;
  /** Document search */
  where: UserAdminWhereInput;
};

export type UserAdminUpdateOneInlineInput = {
  /** Connect existing UserAdmin document */
  connect?: InputMaybe<UserAdminWhereUniqueInput>;
  /** Create and connect one UserAdmin document */
  create?: InputMaybe<UserAdminCreateInput>;
  /** Delete currently connected UserAdmin document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected UserAdmin document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single UserAdmin document */
  update?: InputMaybe<UserAdminUpdateWithNestedWhereUniqueInput>;
  /** Upsert single UserAdmin document */
  upsert?: InputMaybe<UserAdminUpsertWithNestedWhereUniqueInput>;
};

export type UserAdminUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: UserAdminUpdateInput;
  /** Unique document search */
  where: UserAdminWhereUniqueInput;
};

export type UserAdminUpsertInput = {
  /** Create document if it didn't exist */
  create: UserAdminCreateInput;
  /** Update document if it exists */
  update: UserAdminUpdateInput;
};

export type UserAdminUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: UserAdminUpsertInput;
  /** Unique document search */
  where: UserAdminWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type UserAdminWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type UserAdminWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserAdminWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserAdminWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserAdminWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<UserAdminWhereStageInput>;
  documentInStages_none?: InputMaybe<UserAdminWhereStageInput>;
  documentInStages_some?: InputMaybe<UserAdminWhereStageInput>;
  email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  email_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  email_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  email_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  userAdminType?: InputMaybe<UserAdminType>;
  /** All values that are contained in given list. */
  userAdminType_in?: InputMaybe<Array<InputMaybe<UserAdminType>>>;
  /** Any other value that exists and is not equal to the given value. */
  userAdminType_not?: InputMaybe<UserAdminType>;
  /** All values that are not contained in given list. */
  userAdminType_not_in?: InputMaybe<Array<InputMaybe<UserAdminType>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserAdminWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserAdminWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserAdminWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserAdminWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<UserAdminWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References UserAdmin record uniquely */
export type UserAdminWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type UserConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: UserWhereUniqueInput;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<UserEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type UserCreateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateOneInlineInput = {
  /** Connect one existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: User;
};

/** System User Kind */
export enum UserKind {
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC',
  Webhook = 'WEBHOOK'
}

/** Identifies documents */
export type UserManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

export enum UserOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  KindAsc = 'kind_ASC',
  KindDesc = 'kind_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PictureAsc = 'picture_ASC',
  PictureDesc = 'picture_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type UserUpdateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserConnectInput>>;
  /** Disconnect multiple User documents */
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing User documents */
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserUpdateOneInlineInput = {
  /** Connect existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
  /** Disconnect currently connected User document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** This contains a set of filters that can be used to compare values internally */
export type UserWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type UserWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<UserWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References User record uniquely */
export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Version = {
  __typename?: 'Version';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type VersionWhereInput = {
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export enum _FilterKind {
  And = 'AND',
  Not = 'NOT',
  Or = 'OR',
  Contains = 'contains',
  ContainsAll = 'contains_all',
  ContainsNone = 'contains_none',
  ContainsSome = 'contains_some',
  EndsWith = 'ends_with',
  Eq = 'eq',
  EqNot = 'eq_not',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  JsonPathExists = 'json_path_exists',
  JsonValueRecursive = 'json_value_recursive',
  Lt = 'lt',
  Lte = 'lte',
  NotContains = 'not_contains',
  NotEndsWith = 'not_ends_with',
  NotIn = 'not_in',
  NotStartsWith = 'not_starts_with',
  RelationalEvery = 'relational_every',
  RelationalNone = 'relational_none',
  RelationalSingle = 'relational_single',
  RelationalSome = 'relational_some',
  Search = 'search',
  StartsWith = 'starts_with',
  UnionEmpty = 'union_empty',
  UnionEvery = 'union_every',
  UnionNone = 'union_none',
  UnionSingle = 'union_single',
  UnionSome = 'union_some'
}

export enum _MutationInputFieldKind {
  Enum = 'enum',
  Relation = 'relation',
  RichText = 'richText',
  RichTextWithEmbeds = 'richTextWithEmbeds',
  Scalar = 'scalar',
  Union = 'union',
  Virtual = 'virtual'
}

export enum _MutationKind {
  Create = 'create',
  Delete = 'delete',
  DeleteMany = 'deleteMany',
  Publish = 'publish',
  PublishMany = 'publishMany',
  SchedulePublish = 'schedulePublish',
  ScheduleUnpublish = 'scheduleUnpublish',
  Unpublish = 'unpublish',
  UnpublishMany = 'unpublishMany',
  Update = 'update',
  UpdateMany = 'updateMany',
  Upsert = 'upsert'
}

export enum _OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum _RelationInputCardinality {
  Many = 'many',
  One = 'one'
}

export enum _RelationInputKind {
  Create = 'create',
  Update = 'update'
}

export enum _RelationKind {
  Regular = 'regular',
  Union = 'union'
}

export enum _SystemDateTimeFieldVariation {
  Base = 'base',
  Combined = 'combined',
  Localization = 'localization'
}

export type OrdinanceMemberMemberWorkload = Member;

export type OrdinanceMemberMemberWorkloadConnectInput = {
  Member?: InputMaybe<MemberConnectInput>;
};

export type OrdinanceMemberMemberWorkloadCreateInput = {
  Member?: InputMaybe<MemberCreateInput>;
};

export type OrdinanceMemberMemberWorkloadCreateManyInlineInput = {
  /** Connect multiple existing ordinanceMemberMemberWorkload documents */
  connect?: InputMaybe<Array<OrdinanceMemberMemberWorkloadWhereUniqueInput>>;
  /** Create and connect multiple existing ordinanceMemberMemberWorkload documents */
  create?: InputMaybe<Array<OrdinanceMemberMemberWorkloadCreateInput>>;
};

export type OrdinanceMemberMemberWorkloadCreateOneInlineInput = {
  /** Connect one existing ordinanceMemberMemberWorkload document */
  connect?: InputMaybe<OrdinanceMemberMemberWorkloadWhereUniqueInput>;
  /** Create and connect one ordinanceMemberMemberWorkload document */
  create?: InputMaybe<OrdinanceMemberMemberWorkloadCreateInput>;
};

export type OrdinanceMemberMemberWorkloadUpdateInput = {
  Member?: InputMaybe<MemberUpdateInput>;
};

export type OrdinanceMemberMemberWorkloadUpdateManyInlineInput = {
  /** Connect multiple existing ordinanceMemberMemberWorkload documents */
  connect?: InputMaybe<Array<OrdinanceMemberMemberWorkloadConnectInput>>;
  /** Create and connect multiple ordinanceMemberMemberWorkload documents */
  create?: InputMaybe<Array<OrdinanceMemberMemberWorkloadCreateInput>>;
  /** Delete multiple ordinanceMemberMemberWorkload documents */
  delete?: InputMaybe<Array<OrdinanceMemberMemberWorkloadWhereUniqueInput>>;
  /** Disconnect multiple ordinanceMemberMemberWorkload documents */
  disconnect?: InputMaybe<Array<OrdinanceMemberMemberWorkloadWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ordinanceMemberMemberWorkload documents */
  set?: InputMaybe<Array<OrdinanceMemberMemberWorkloadWhereUniqueInput>>;
  /** Update multiple ordinanceMemberMemberWorkload documents */
  update?: InputMaybe<Array<OrdinanceMemberMemberWorkloadUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ordinanceMemberMemberWorkload documents */
  upsert?: InputMaybe<Array<OrdinanceMemberMemberWorkloadUpsertWithNestedWhereUniqueInput>>;
};

export type OrdinanceMemberMemberWorkloadUpdateManyWithNestedWhereInput = {
  Member?: InputMaybe<MemberUpdateManyWithNestedWhereInput>;
};

export type OrdinanceMemberMemberWorkloadUpdateOneInlineInput = {
  /** Connect existing ordinanceMemberMemberWorkload document */
  connect?: InputMaybe<OrdinanceMemberMemberWorkloadWhereUniqueInput>;
  /** Create and connect one ordinanceMemberMemberWorkload document */
  create?: InputMaybe<OrdinanceMemberMemberWorkloadCreateInput>;
  /** Delete currently connected ordinanceMemberMemberWorkload document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected ordinanceMemberMemberWorkload document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single ordinanceMemberMemberWorkload document */
  update?: InputMaybe<OrdinanceMemberMemberWorkloadUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ordinanceMemberMemberWorkload document */
  upsert?: InputMaybe<OrdinanceMemberMemberWorkloadUpsertWithNestedWhereUniqueInput>;
};

export type OrdinanceMemberMemberWorkloadUpdateWithNestedWhereUniqueInput = {
  Member?: InputMaybe<MemberUpdateWithNestedWhereUniqueInput>;
};

export type OrdinanceMemberMemberWorkloadUpsertWithNestedWhereUniqueInput = {
  Member?: InputMaybe<MemberUpsertWithNestedWhereUniqueInput>;
};

export type OrdinanceMemberMemberWorkloadWhereInput = {
  Member?: InputMaybe<MemberWhereInput>;
};

export type OrdinanceMemberMemberWorkloadWhereUniqueInput = {
  Member?: InputMaybe<MemberWhereUniqueInput>;
};

export type OrdinanceMemberOrdinanceMember = Ordinance;

export type OrdinanceMemberOrdinanceMemberConnectInput = {
  Ordinance?: InputMaybe<OrdinanceConnectInput>;
};

export type OrdinanceMemberOrdinanceMemberCreateInput = {
  Ordinance?: InputMaybe<OrdinanceCreateInput>;
};

export type OrdinanceMemberOrdinanceMemberCreateManyInlineInput = {
  /** Connect multiple existing ordinanceMemberOrdinanceMember documents */
  connect?: InputMaybe<Array<OrdinanceMemberOrdinanceMemberWhereUniqueInput>>;
  /** Create and connect multiple existing ordinanceMemberOrdinanceMember documents */
  create?: InputMaybe<Array<OrdinanceMemberOrdinanceMemberCreateInput>>;
};

export type OrdinanceMemberOrdinanceMemberCreateOneInlineInput = {
  /** Connect one existing ordinanceMemberOrdinanceMember document */
  connect?: InputMaybe<OrdinanceMemberOrdinanceMemberWhereUniqueInput>;
  /** Create and connect one ordinanceMemberOrdinanceMember document */
  create?: InputMaybe<OrdinanceMemberOrdinanceMemberCreateInput>;
};

export type OrdinanceMemberOrdinanceMemberUpdateInput = {
  Ordinance?: InputMaybe<OrdinanceUpdateInput>;
};

export type OrdinanceMemberOrdinanceMemberUpdateManyInlineInput = {
  /** Connect multiple existing ordinanceMemberOrdinanceMember documents */
  connect?: InputMaybe<Array<OrdinanceMemberOrdinanceMemberConnectInput>>;
  /** Create and connect multiple ordinanceMemberOrdinanceMember documents */
  create?: InputMaybe<Array<OrdinanceMemberOrdinanceMemberCreateInput>>;
  /** Delete multiple ordinanceMemberOrdinanceMember documents */
  delete?: InputMaybe<Array<OrdinanceMemberOrdinanceMemberWhereUniqueInput>>;
  /** Disconnect multiple ordinanceMemberOrdinanceMember documents */
  disconnect?: InputMaybe<Array<OrdinanceMemberOrdinanceMemberWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ordinanceMemberOrdinanceMember documents */
  set?: InputMaybe<Array<OrdinanceMemberOrdinanceMemberWhereUniqueInput>>;
  /** Update multiple ordinanceMemberOrdinanceMember documents */
  update?: InputMaybe<Array<OrdinanceMemberOrdinanceMemberUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ordinanceMemberOrdinanceMember documents */
  upsert?: InputMaybe<Array<OrdinanceMemberOrdinanceMemberUpsertWithNestedWhereUniqueInput>>;
};

export type OrdinanceMemberOrdinanceMemberUpdateManyWithNestedWhereInput = {
  Ordinance?: InputMaybe<OrdinanceUpdateManyWithNestedWhereInput>;
};

export type OrdinanceMemberOrdinanceMemberUpdateOneInlineInput = {
  /** Connect existing ordinanceMemberOrdinanceMember document */
  connect?: InputMaybe<OrdinanceMemberOrdinanceMemberWhereUniqueInput>;
  /** Create and connect one ordinanceMemberOrdinanceMember document */
  create?: InputMaybe<OrdinanceMemberOrdinanceMemberCreateInput>;
  /** Delete currently connected ordinanceMemberOrdinanceMember document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected ordinanceMemberOrdinanceMember document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single ordinanceMemberOrdinanceMember document */
  update?: InputMaybe<OrdinanceMemberOrdinanceMemberUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ordinanceMemberOrdinanceMember document */
  upsert?: InputMaybe<OrdinanceMemberOrdinanceMemberUpsertWithNestedWhereUniqueInput>;
};

export type OrdinanceMemberOrdinanceMemberUpdateWithNestedWhereUniqueInput = {
  Ordinance?: InputMaybe<OrdinanceUpdateWithNestedWhereUniqueInput>;
};

export type OrdinanceMemberOrdinanceMemberUpsertWithNestedWhereUniqueInput = {
  Ordinance?: InputMaybe<OrdinanceUpsertWithNestedWhereUniqueInput>;
};

export type OrdinanceMemberOrdinanceMemberWhereInput = {
  Ordinance?: InputMaybe<OrdinanceWhereInput>;
};

export type OrdinanceMemberOrdinanceMemberWhereUniqueInput = {
  Ordinance?: InputMaybe<OrdinanceWhereUniqueInput>;
};

export type CreateMemberMutationVariables = Exact<{
  name: Scalars['String'];
  matriculaSiape: Scalars['Int'];
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', createMember?: { __typename?: 'Member', id: string } | null };

export type CreateOrdinanceMutationVariables = Exact<{
  number: Scalars['String'];
  subject: Scalars['String'];
  effectiveStartDate: Scalars['Date'];
  ordinanceType: OrdinanceType;
  effectiveEndDate?: InputMaybe<Scalars['Date']>;
}>;


export type CreateOrdinanceMutation = { __typename?: 'Mutation', createOrdinance?: { __typename?: 'Ordinance', id: string, number: string } | null };

export type CreateOrdinanceMemberMutationVariables = Exact<{
  memberId?: InputMaybe<Scalars['ID']>;
  memberType?: InputMaybe<MemberType>;
  workload: Scalars['Int'];
}>;


export type CreateOrdinanceMemberMutation = { __typename?: 'Mutation', createOrdinanceMember?: { __typename?: 'OrdinanceMember', id: string } | null };

export type CreateUserAdminMutationVariables = Exact<{
  email: Scalars['String'];
  userType: UserAdminType;
}>;


export type CreateUserAdminMutation = { __typename?: 'Mutation', createUserAdmin?: { __typename?: 'UserAdmin', id: string } | null };

export type DeleteMemberMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type DeleteMemberMutation = { __typename?: 'Mutation', deleteMember?: { __typename?: 'Member', id: string } | null };

export type DeleteOrdinanceMutationVariables = Exact<{
  number?: InputMaybe<Scalars['String']>;
}>;


export type DeleteOrdinanceMutation = { __typename?: 'Mutation', deleteOrdinance?: { __typename?: 'Ordinance', id: string } | null };

export type DeleteOrdinanceMemberMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteOrdinanceMemberMutation = { __typename?: 'Mutation', deleteManyOrdinanceMembersConnection: { __typename?: 'OrdinanceMemberConnection', edges: Array<{ __typename?: 'OrdinanceMemberEdge', node: { __typename?: 'OrdinanceMember', id: string } }> } };

export type DeleteUserAdminMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserAdminMutation = { __typename?: 'Mutation', deleteUserAdmin?: { __typename?: 'UserAdmin', id: string } | null };

export type PublishMemberMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type PublishMemberMutation = { __typename?: 'Mutation', publishMember?: { __typename?: 'Member', id: string } | null };

export type PublishOrdinanceMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  number?: InputMaybe<Scalars['String']>;
  idMembers?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  idOrdinanceMembers?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type PublishOrdinanceMutation = { __typename?: 'Mutation', publishOrdinance?: { __typename?: 'Ordinance', id: string } | null, publishManyMembersConnection: { __typename?: 'MemberConnection', edges: Array<{ __typename?: 'MemberEdge', node: { __typename?: 'Member', id: string } }> }, publishManyOrdinanceMembersConnection: { __typename?: 'OrdinanceMemberConnection', edges: Array<{ __typename?: 'OrdinanceMemberEdge', node: { __typename?: 'OrdinanceMember', id: string } }> } };

export type PublishOrdinanceMemberMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type PublishOrdinanceMemberMutation = { __typename?: 'Mutation', publishOrdinanceMember?: { __typename?: 'OrdinanceMember', id: string } | null };

export type UpdateMemberMutationVariables = Exact<{
  idMember: Scalars['ID'];
  idOrdinance: Scalars['ID'];
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', updateMember?: { __typename?: 'Member', id: string } | null };

export type UpdateMemberOrdinanceDisconnectMutationVariables = Exact<{
  number?: InputMaybe<Scalars['String']>;
  memberDisconnect?: InputMaybe<Scalars['ID']>;
  ordinanceMemberDisconnect?: InputMaybe<Scalars['ID']>;
}>;


export type UpdateMemberOrdinanceDisconnectMutation = { __typename?: 'Mutation', updateOrdinance?: { __typename?: 'Ordinance', id: string } | null };

export type UpdateOrdinanceMutationVariables = Exact<{
  connectionsMembers?: InputMaybe<Array<MemberConnectInput> | MemberConnectInput>;
  connectionsOrdinanceMembers?: InputMaybe<Array<OrdinanceMemberConnectInput> | OrdinanceMemberConnectInput>;
  idOrdinance: Scalars['ID'];
}>;


export type UpdateOrdinanceMutation = { __typename?: 'Mutation', updateOrdinance?: { __typename?: 'Ordinance', id: string } | null };

export type UpdateOrdinanceSituationMutationVariables = Exact<{
  number: Scalars['String'];
}>;


export type UpdateOrdinanceSituationMutation = { __typename?: 'Mutation', updateOrdinance?: { __typename?: 'Ordinance', ordinanceSituation?: OrdinanceSituation | null } | null };

export type UpdateOrdinanceAdminMutationVariables = Exact<{
  number?: InputMaybe<Scalars['String']>;
  effectiveStartDate?: InputMaybe<Scalars['Date']>;
  ordinanceType?: InputMaybe<OrdinanceType>;
  effectiveEndDate?: InputMaybe<Scalars['Date']>;
  subject?: InputMaybe<Scalars['String']>;
}>;


export type UpdateOrdinanceAdminMutation = { __typename?: 'Mutation', updateOrdinance?: { __typename?: 'Ordinance', id: string } | null };

export type UpdateOrdinanceMemberMutationVariables = Exact<{
  id: Scalars['ID'];
  ordinanceId: Scalars['ID'];
}>;


export type UpdateOrdinanceMemberMutation = { __typename?: 'Mutation', updateOrdinanceMember?: { __typename?: 'OrdinanceMember', id: string } | null };

export type GetMembersByMatriculaQueryVariables = Exact<{
  matricula: Scalars['Int'];
}>;


export type GetMembersByMatriculaQuery = { __typename?: 'Query', member?: { __typename?: 'Member', id: string, name: string, matriculaSiape: number, ordinances: Array<{ __typename?: 'Ordinance', id: string, number: string }> } | null };

export type GetMembersByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetMembersByNameQuery = { __typename?: 'Query', members: Array<{ __typename?: 'Member', id: string, name: string, matriculaSiape: number }> };

export type GetMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersQuery = { __typename?: 'Query', members: Array<{ __typename?: 'Member', id: string, name: string, matriculaSiape: number, ordinanceMember: Array<{ __typename?: 'OrdinanceMember', id: string, memberType?: MemberType | null, workload: number, memberWorkload: Array<{ __typename?: 'Member', id: string }> }> }> };

export type GetOrdinanceByNumberQueryVariables = Exact<{
  number: Scalars['String'];
}>;


export type GetOrdinanceByNumberQuery = { __typename?: 'Query', ordinance?: { __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null, subject: string, members: Array<{ __typename?: 'Member', id: string, name: string, matriculaSiape: number, ordinanceMember: Array<{ __typename?: 'OrdinanceMember', id: string, memberType?: MemberType | null, workload: number, memberWorkload: Array<{ __typename?: 'Member', id: string }> }> }> } | null };

export type GetOrdinancesAllQueryVariables = Exact<{
  number?: InputMaybe<Scalars['String']>;
  matricula?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  ordinanceType?: InputMaybe<OrdinanceType>;
  memberType?: InputMaybe<MemberType>;
}>;


export type GetOrdinancesAllQuery = { __typename?: 'Query', ordinance?: { __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null, subject: string, members: Array<{ __typename?: 'Member', id: string, name: string, matriculaSiape: number, ordinanceMember: Array<{ __typename?: 'OrdinanceMember', id: string, memberType?: MemberType | null, workload: number, memberWorkload: Array<{ __typename?: 'Member', id: string }> }> }> } | null, member?: { __typename?: 'Member', id: string, name: string, matriculaSiape: number, ordinances: Array<{ __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null, subject: string }>, ordinanceMember: Array<{ __typename?: 'OrdinanceMember', id: string, memberType?: MemberType | null, workload: number, memberWorkload: Array<{ __typename?: 'Member', id: string }> }> } | null, members: Array<{ __typename?: 'Member', name: string, ordinances: Array<{ __typename?: 'Ordinance', number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null }> }>, ordinances: Array<{ __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null, members: Array<{ __typename?: 'Member', name: string }> }>, ordinanceMembers: Array<{ __typename?: 'OrdinanceMember', memberType?: MemberType | null, memberWorkload: Array<{ __typename?: 'Member', id: string, name: string, ordinances: Array<{ __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null }> }> }> };

export type GetOrdinancesAsideQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdinancesAsideQuery = { __typename?: 'Query', ordinances: Array<{ __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, subject: string, members: Array<{ __typename?: 'Member', name: string }> }> };

export type GetOrdinancesByDateQueryVariables = Exact<{
  dateStart: Scalars['Date'];
  dateEnd: Scalars['Date'];
}>;


export type GetOrdinancesByDateQuery = { __typename?: 'Query', ordinances: Array<{ __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null, members: Array<{ __typename?: 'Member', name: string }> }> };

export type GetOrdinancesByMemberMatriculaQueryVariables = Exact<{
  matriculaSiape: Scalars['Int'];
}>;


export type GetOrdinancesByMemberMatriculaQuery = { __typename?: 'Query', member?: { __typename?: 'Member', id: string, name: string, matriculaSiape: number, ordinanceMember: Array<{ __typename?: 'OrdinanceMember', id: string, memberType?: MemberType | null, workload: number, ordinanceWorkload: Array<{ __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null, subject: string }> }> } | null };

export type GetOrdinancesByMemberNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetOrdinancesByMemberNameQuery = { __typename?: 'Query', members: Array<{ __typename?: 'Member', name: string, id: string, ordinanceMember: Array<{ __typename?: 'OrdinanceMember', workload: number, ordinanceWorkload: Array<{ __typename?: 'Ordinance', id: string, number: string, effectiveEndDate?: any | null, effectiveStartDate: any, ordinanceType: OrdinanceType }> }> }> };

export type GetOrdinancesByMemberTypeQueryVariables = Exact<{
  memberType?: InputMaybe<MemberType>;
}>;


export type GetOrdinancesByMemberTypeQuery = { __typename?: 'Query', ordinanceMembers: Array<{ __typename?: 'OrdinanceMember', workload: number, memberType?: MemberType | null, memberWorkload: Array<{ __typename?: 'Member', id: string, name: string, ordinances: Array<{ __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null }> }> }> };

export type GetOrdinancesByTypeQueryVariables = Exact<{
  ordinanceType: OrdinanceType;
}>;


export type GetOrdinancesByTypeQuery = { __typename?: 'Query', ordinances: Array<{ __typename?: 'Ordinance', id: string, number: string, ordinanceType: OrdinanceType, effectiveStartDate: any, effectiveEndDate?: any | null, members: Array<{ __typename?: 'Member', name: string }> }> };

export type GetOrdinancesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdinancesQuery = { __typename?: 'Query', ordinances: Array<{ __typename?: 'Ordinance', id: string, number: string, effectiveEndDate?: any | null, effectiveStartDate: any, ordinanceType: OrdinanceType, subject: string, members: Array<{ __typename?: 'Member', id: string, name: string, matriculaSiape: number, ordinanceMember: Array<{ __typename?: 'OrdinanceMember', id: string, memberType?: MemberType | null, workload: number, memberWorkload: Array<{ __typename?: 'Member', id: string }> }> }> }> };

export type GetUserAdminQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserAdminQuery = { __typename?: 'Query', userAdmin?: { __typename?: 'UserAdmin', id: string, email: string } | null };

export type GetUserAdminsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAdminsQuery = { __typename?: 'Query', userAdmins: Array<{ __typename?: 'UserAdmin', id: string, email: string, userAdminType: UserAdminType }> };


export const CreateMemberDocument = gql`
    mutation CreateMember($name: String!, $matriculaSiape: Int!) {
  createMember(data: {name: $name, matriculaSiape: $matriculaSiape}) {
    id
  }
}
    `;
export type CreateMemberMutationFn = Apollo.MutationFunction<CreateMemberMutation, CreateMemberMutationVariables>;

/**
 * __useCreateMemberMutation__
 *
 * To run a mutation, you first call `useCreateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberMutation, { data, loading, error }] = useCreateMemberMutation({
 *   variables: {
 *      name: // value for 'name'
 *      matriculaSiape: // value for 'matriculaSiape'
 *   },
 * });
 */
export function useCreateMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemberMutation, CreateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, options);
      }
export type CreateMemberMutationHookResult = ReturnType<typeof useCreateMemberMutation>;
export type CreateMemberMutationResult = Apollo.MutationResult<CreateMemberMutation>;
export type CreateMemberMutationOptions = Apollo.BaseMutationOptions<CreateMemberMutation, CreateMemberMutationVariables>;
export const CreateOrdinanceDocument = gql`
    mutation CreateOrdinance($number: String!, $subject: String!, $effectiveStartDate: Date!, $ordinanceType: OrdinanceType!, $effectiveEndDate: Date) {
  createOrdinance(
    data: {number: $number, subject: $subject, effectiveStartDate: $effectiveStartDate, ordinanceType: $ordinanceType, effectiveEndDate: $effectiveEndDate}
  ) {
    id
    number
  }
}
    `;
export type CreateOrdinanceMutationFn = Apollo.MutationFunction<CreateOrdinanceMutation, CreateOrdinanceMutationVariables>;

/**
 * __useCreateOrdinanceMutation__
 *
 * To run a mutation, you first call `useCreateOrdinanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrdinanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrdinanceMutation, { data, loading, error }] = useCreateOrdinanceMutation({
 *   variables: {
 *      number: // value for 'number'
 *      subject: // value for 'subject'
 *      effectiveStartDate: // value for 'effectiveStartDate'
 *      ordinanceType: // value for 'ordinanceType'
 *      effectiveEndDate: // value for 'effectiveEndDate'
 *   },
 * });
 */
export function useCreateOrdinanceMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrdinanceMutation, CreateOrdinanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrdinanceMutation, CreateOrdinanceMutationVariables>(CreateOrdinanceDocument, options);
      }
export type CreateOrdinanceMutationHookResult = ReturnType<typeof useCreateOrdinanceMutation>;
export type CreateOrdinanceMutationResult = Apollo.MutationResult<CreateOrdinanceMutation>;
export type CreateOrdinanceMutationOptions = Apollo.BaseMutationOptions<CreateOrdinanceMutation, CreateOrdinanceMutationVariables>;
export const CreateOrdinanceMemberDocument = gql`
    mutation CreateOrdinanceMember($memberId: ID, $memberType: MemberType, $workload: Int!) {
  createOrdinanceMember(
    data: {workload: $workload, memberType: $memberType, memberWorkload: {connect: {Member: {id: $memberId}}}}
  ) {
    id
  }
}
    `;
export type CreateOrdinanceMemberMutationFn = Apollo.MutationFunction<CreateOrdinanceMemberMutation, CreateOrdinanceMemberMutationVariables>;

/**
 * __useCreateOrdinanceMemberMutation__
 *
 * To run a mutation, you first call `useCreateOrdinanceMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrdinanceMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrdinanceMemberMutation, { data, loading, error }] = useCreateOrdinanceMemberMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      memberType: // value for 'memberType'
 *      workload: // value for 'workload'
 *   },
 * });
 */
export function useCreateOrdinanceMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrdinanceMemberMutation, CreateOrdinanceMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrdinanceMemberMutation, CreateOrdinanceMemberMutationVariables>(CreateOrdinanceMemberDocument, options);
      }
export type CreateOrdinanceMemberMutationHookResult = ReturnType<typeof useCreateOrdinanceMemberMutation>;
export type CreateOrdinanceMemberMutationResult = Apollo.MutationResult<CreateOrdinanceMemberMutation>;
export type CreateOrdinanceMemberMutationOptions = Apollo.BaseMutationOptions<CreateOrdinanceMemberMutation, CreateOrdinanceMemberMutationVariables>;
export const CreateUserAdminDocument = gql`
    mutation CreateUserAdmin($email: String!, $userType: UserAdminType!) {
  createUserAdmin(data: {email: $email, userAdminType: $userType}) {
    id
  }
}
    `;
export type CreateUserAdminMutationFn = Apollo.MutationFunction<CreateUserAdminMutation, CreateUserAdminMutationVariables>;

/**
 * __useCreateUserAdminMutation__
 *
 * To run a mutation, you first call `useCreateUserAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserAdminMutation, { data, loading, error }] = useCreateUserAdminMutation({
 *   variables: {
 *      email: // value for 'email'
 *      userType: // value for 'userType'
 *   },
 * });
 */
export function useCreateUserAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserAdminMutation, CreateUserAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserAdminMutation, CreateUserAdminMutationVariables>(CreateUserAdminDocument, options);
      }
export type CreateUserAdminMutationHookResult = ReturnType<typeof useCreateUserAdminMutation>;
export type CreateUserAdminMutationResult = Apollo.MutationResult<CreateUserAdminMutation>;
export type CreateUserAdminMutationOptions = Apollo.BaseMutationOptions<CreateUserAdminMutation, CreateUserAdminMutationVariables>;
export const DeleteMemberDocument = gql`
    mutation DeleteMember($id: ID) {
  deleteMember(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteMemberMutationFn = Apollo.MutationFunction<DeleteMemberMutation, DeleteMemberMutationVariables>;

/**
 * __useDeleteMemberMutation__
 *
 * To run a mutation, you first call `useDeleteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMemberMutation, { data, loading, error }] = useDeleteMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMemberMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMemberMutation, DeleteMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMemberMutation, DeleteMemberMutationVariables>(DeleteMemberDocument, options);
      }
export type DeleteMemberMutationHookResult = ReturnType<typeof useDeleteMemberMutation>;
export type DeleteMemberMutationResult = Apollo.MutationResult<DeleteMemberMutation>;
export type DeleteMemberMutationOptions = Apollo.BaseMutationOptions<DeleteMemberMutation, DeleteMemberMutationVariables>;
export const DeleteOrdinanceDocument = gql`
    mutation DeleteOrdinance($number: String) {
  deleteOrdinance(where: {number: $number}) {
    id
  }
}
    `;
export type DeleteOrdinanceMutationFn = Apollo.MutationFunction<DeleteOrdinanceMutation, DeleteOrdinanceMutationVariables>;

/**
 * __useDeleteOrdinanceMutation__
 *
 * To run a mutation, you first call `useDeleteOrdinanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrdinanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrdinanceMutation, { data, loading, error }] = useDeleteOrdinanceMutation({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useDeleteOrdinanceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrdinanceMutation, DeleteOrdinanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrdinanceMutation, DeleteOrdinanceMutationVariables>(DeleteOrdinanceDocument, options);
      }
export type DeleteOrdinanceMutationHookResult = ReturnType<typeof useDeleteOrdinanceMutation>;
export type DeleteOrdinanceMutationResult = Apollo.MutationResult<DeleteOrdinanceMutation>;
export type DeleteOrdinanceMutationOptions = Apollo.BaseMutationOptions<DeleteOrdinanceMutation, DeleteOrdinanceMutationVariables>;
export const DeleteOrdinanceMemberDocument = gql`
    mutation DeleteOrdinanceMember {
  deleteManyOrdinanceMembersConnection(where: {ordinanceWorkload_empty: true}) {
    edges {
      node {
        id
      }
    }
  }
}
    `;
export type DeleteOrdinanceMemberMutationFn = Apollo.MutationFunction<DeleteOrdinanceMemberMutation, DeleteOrdinanceMemberMutationVariables>;

/**
 * __useDeleteOrdinanceMemberMutation__
 *
 * To run a mutation, you first call `useDeleteOrdinanceMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrdinanceMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrdinanceMemberMutation, { data, loading, error }] = useDeleteOrdinanceMemberMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteOrdinanceMemberMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrdinanceMemberMutation, DeleteOrdinanceMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrdinanceMemberMutation, DeleteOrdinanceMemberMutationVariables>(DeleteOrdinanceMemberDocument, options);
      }
export type DeleteOrdinanceMemberMutationHookResult = ReturnType<typeof useDeleteOrdinanceMemberMutation>;
export type DeleteOrdinanceMemberMutationResult = Apollo.MutationResult<DeleteOrdinanceMemberMutation>;
export type DeleteOrdinanceMemberMutationOptions = Apollo.BaseMutationOptions<DeleteOrdinanceMemberMutation, DeleteOrdinanceMemberMutationVariables>;
export const DeleteUserAdminDocument = gql`
    mutation DeleteUserAdmin($id: ID!) {
  deleteUserAdmin(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteUserAdminMutationFn = Apollo.MutationFunction<DeleteUserAdminMutation, DeleteUserAdminMutationVariables>;

/**
 * __useDeleteUserAdminMutation__
 *
 * To run a mutation, you first call `useDeleteUserAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserAdminMutation, { data, loading, error }] = useDeleteUserAdminMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserAdminMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserAdminMutation, DeleteUserAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserAdminMutation, DeleteUserAdminMutationVariables>(DeleteUserAdminDocument, options);
      }
export type DeleteUserAdminMutationHookResult = ReturnType<typeof useDeleteUserAdminMutation>;
export type DeleteUserAdminMutationResult = Apollo.MutationResult<DeleteUserAdminMutation>;
export type DeleteUserAdminMutationOptions = Apollo.BaseMutationOptions<DeleteUserAdminMutation, DeleteUserAdminMutationVariables>;
export const PublishMemberDocument = gql`
    mutation PublishMember($id: ID) {
  publishMember(where: {id: $id}) {
    id
  }
}
    `;
export type PublishMemberMutationFn = Apollo.MutationFunction<PublishMemberMutation, PublishMemberMutationVariables>;

/**
 * __usePublishMemberMutation__
 *
 * To run a mutation, you first call `usePublishMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishMemberMutation, { data, loading, error }] = usePublishMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishMemberMutation(baseOptions?: Apollo.MutationHookOptions<PublishMemberMutation, PublishMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishMemberMutation, PublishMemberMutationVariables>(PublishMemberDocument, options);
      }
export type PublishMemberMutationHookResult = ReturnType<typeof usePublishMemberMutation>;
export type PublishMemberMutationResult = Apollo.MutationResult<PublishMemberMutation>;
export type PublishMemberMutationOptions = Apollo.BaseMutationOptions<PublishMemberMutation, PublishMemberMutationVariables>;
export const PublishOrdinanceDocument = gql`
    mutation PublishOrdinance($id: ID, $number: String, $idMembers: [ID!], $idOrdinanceMembers: [ID!]) {
  publishOrdinance(where: {id: $id, number: $number}) {
    id
  }
  publishManyMembersConnection(where: {id_in: $idMembers}) {
    edges {
      node {
        id
      }
    }
  }
  publishManyOrdinanceMembersConnection(where: {id_in: $idOrdinanceMembers}) {
    edges {
      node {
        id
      }
    }
  }
}
    `;
export type PublishOrdinanceMutationFn = Apollo.MutationFunction<PublishOrdinanceMutation, PublishOrdinanceMutationVariables>;

/**
 * __usePublishOrdinanceMutation__
 *
 * To run a mutation, you first call `usePublishOrdinanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishOrdinanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishOrdinanceMutation, { data, loading, error }] = usePublishOrdinanceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      number: // value for 'number'
 *      idMembers: // value for 'idMembers'
 *      idOrdinanceMembers: // value for 'idOrdinanceMembers'
 *   },
 * });
 */
export function usePublishOrdinanceMutation(baseOptions?: Apollo.MutationHookOptions<PublishOrdinanceMutation, PublishOrdinanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishOrdinanceMutation, PublishOrdinanceMutationVariables>(PublishOrdinanceDocument, options);
      }
export type PublishOrdinanceMutationHookResult = ReturnType<typeof usePublishOrdinanceMutation>;
export type PublishOrdinanceMutationResult = Apollo.MutationResult<PublishOrdinanceMutation>;
export type PublishOrdinanceMutationOptions = Apollo.BaseMutationOptions<PublishOrdinanceMutation, PublishOrdinanceMutationVariables>;
export const PublishOrdinanceMemberDocument = gql`
    mutation PublishOrdinanceMember($id: ID) {
  publishOrdinanceMember(where: {id: $id}) {
    id
  }
}
    `;
export type PublishOrdinanceMemberMutationFn = Apollo.MutationFunction<PublishOrdinanceMemberMutation, PublishOrdinanceMemberMutationVariables>;

/**
 * __usePublishOrdinanceMemberMutation__
 *
 * To run a mutation, you first call `usePublishOrdinanceMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishOrdinanceMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishOrdinanceMemberMutation, { data, loading, error }] = usePublishOrdinanceMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishOrdinanceMemberMutation(baseOptions?: Apollo.MutationHookOptions<PublishOrdinanceMemberMutation, PublishOrdinanceMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishOrdinanceMemberMutation, PublishOrdinanceMemberMutationVariables>(PublishOrdinanceMemberDocument, options);
      }
export type PublishOrdinanceMemberMutationHookResult = ReturnType<typeof usePublishOrdinanceMemberMutation>;
export type PublishOrdinanceMemberMutationResult = Apollo.MutationResult<PublishOrdinanceMemberMutation>;
export type PublishOrdinanceMemberMutationOptions = Apollo.BaseMutationOptions<PublishOrdinanceMemberMutation, PublishOrdinanceMemberMutationVariables>;
export const UpdateMemberDocument = gql`
    mutation UpdateMember($idMember: ID!, $idOrdinance: ID!) {
  updateMember(
    data: {ordinances: {connect: {Ordinance: {where: {id: $idOrdinance}}}}}
    where: {id: $idMember}
  ) {
    id
  }
}
    `;
export type UpdateMemberMutationFn = Apollo.MutationFunction<UpdateMemberMutation, UpdateMemberMutationVariables>;

/**
 * __useUpdateMemberMutation__
 *
 * To run a mutation, you first call `useUpdateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMemberMutation, { data, loading, error }] = useUpdateMemberMutation({
 *   variables: {
 *      idMember: // value for 'idMember'
 *      idOrdinance: // value for 'idOrdinance'
 *   },
 * });
 */
export function useUpdateMemberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMemberMutation, UpdateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMemberMutation, UpdateMemberMutationVariables>(UpdateMemberDocument, options);
      }
export type UpdateMemberMutationHookResult = ReturnType<typeof useUpdateMemberMutation>;
export type UpdateMemberMutationResult = Apollo.MutationResult<UpdateMemberMutation>;
export type UpdateMemberMutationOptions = Apollo.BaseMutationOptions<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const UpdateMemberOrdinanceDisconnectDocument = gql`
    mutation UpdateMemberOrdinanceDisconnect($number: String, $memberDisconnect: ID, $ordinanceMemberDisconnect: ID) {
  updateOrdinance(
    data: {members: {disconnect: {id: $memberDisconnect}}, ordinanceMember: {disconnect: {id: $ordinanceMemberDisconnect}}}
    where: {number: $number}
  ) {
    id
  }
}
    `;
export type UpdateMemberOrdinanceDisconnectMutationFn = Apollo.MutationFunction<UpdateMemberOrdinanceDisconnectMutation, UpdateMemberOrdinanceDisconnectMutationVariables>;

/**
 * __useUpdateMemberOrdinanceDisconnectMutation__
 *
 * To run a mutation, you first call `useUpdateMemberOrdinanceDisconnectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMemberOrdinanceDisconnectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMemberOrdinanceDisconnectMutation, { data, loading, error }] = useUpdateMemberOrdinanceDisconnectMutation({
 *   variables: {
 *      number: // value for 'number'
 *      memberDisconnect: // value for 'memberDisconnect'
 *      ordinanceMemberDisconnect: // value for 'ordinanceMemberDisconnect'
 *   },
 * });
 */
export function useUpdateMemberOrdinanceDisconnectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMemberOrdinanceDisconnectMutation, UpdateMemberOrdinanceDisconnectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMemberOrdinanceDisconnectMutation, UpdateMemberOrdinanceDisconnectMutationVariables>(UpdateMemberOrdinanceDisconnectDocument, options);
      }
export type UpdateMemberOrdinanceDisconnectMutationHookResult = ReturnType<typeof useUpdateMemberOrdinanceDisconnectMutation>;
export type UpdateMemberOrdinanceDisconnectMutationResult = Apollo.MutationResult<UpdateMemberOrdinanceDisconnectMutation>;
export type UpdateMemberOrdinanceDisconnectMutationOptions = Apollo.BaseMutationOptions<UpdateMemberOrdinanceDisconnectMutation, UpdateMemberOrdinanceDisconnectMutationVariables>;
export const UpdateOrdinanceDocument = gql`
    mutation UpdateOrdinance($connectionsMembers: [MemberConnectInput!], $connectionsOrdinanceMembers: [OrdinanceMemberConnectInput!], $idOrdinance: ID!) {
  updateOrdinance(
    where: {id: $idOrdinance}
    data: {members: {connect: $connectionsMembers}, ordinanceMember: {connect: $connectionsOrdinanceMembers}}
  ) {
    id
  }
}
    `;
export type UpdateOrdinanceMutationFn = Apollo.MutationFunction<UpdateOrdinanceMutation, UpdateOrdinanceMutationVariables>;

/**
 * __useUpdateOrdinanceMutation__
 *
 * To run a mutation, you first call `useUpdateOrdinanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrdinanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrdinanceMutation, { data, loading, error }] = useUpdateOrdinanceMutation({
 *   variables: {
 *      connectionsMembers: // value for 'connectionsMembers'
 *      connectionsOrdinanceMembers: // value for 'connectionsOrdinanceMembers'
 *      idOrdinance: // value for 'idOrdinance'
 *   },
 * });
 */
export function useUpdateOrdinanceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrdinanceMutation, UpdateOrdinanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrdinanceMutation, UpdateOrdinanceMutationVariables>(UpdateOrdinanceDocument, options);
      }
export type UpdateOrdinanceMutationHookResult = ReturnType<typeof useUpdateOrdinanceMutation>;
export type UpdateOrdinanceMutationResult = Apollo.MutationResult<UpdateOrdinanceMutation>;
export type UpdateOrdinanceMutationOptions = Apollo.BaseMutationOptions<UpdateOrdinanceMutation, UpdateOrdinanceMutationVariables>;
export const UpdateOrdinanceSituationDocument = gql`
    mutation UpdateOrdinanceSituation($number: String!) {
  updateOrdinance(data: {ordinanceSituation: revoked}, where: {number: $number}) {
    ordinanceSituation
  }
}
    `;
export type UpdateOrdinanceSituationMutationFn = Apollo.MutationFunction<UpdateOrdinanceSituationMutation, UpdateOrdinanceSituationMutationVariables>;

/**
 * __useUpdateOrdinanceSituationMutation__
 *
 * To run a mutation, you first call `useUpdateOrdinanceSituationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrdinanceSituationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrdinanceSituationMutation, { data, loading, error }] = useUpdateOrdinanceSituationMutation({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useUpdateOrdinanceSituationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrdinanceSituationMutation, UpdateOrdinanceSituationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrdinanceSituationMutation, UpdateOrdinanceSituationMutationVariables>(UpdateOrdinanceSituationDocument, options);
      }
export type UpdateOrdinanceSituationMutationHookResult = ReturnType<typeof useUpdateOrdinanceSituationMutation>;
export type UpdateOrdinanceSituationMutationResult = Apollo.MutationResult<UpdateOrdinanceSituationMutation>;
export type UpdateOrdinanceSituationMutationOptions = Apollo.BaseMutationOptions<UpdateOrdinanceSituationMutation, UpdateOrdinanceSituationMutationVariables>;
export const UpdateOrdinanceAdminDocument = gql`
    mutation UpdateOrdinanceAdmin($number: String, $effectiveStartDate: Date, $ordinanceType: OrdinanceType, $effectiveEndDate: Date, $subject: String) {
  updateOrdinance(
    data: {effectiveStartDate: $effectiveStartDate, ordinanceType: $ordinanceType, effectiveEndDate: $effectiveEndDate, subject: $subject}
    where: {number: $number}
  ) {
    id
  }
}
    `;
export type UpdateOrdinanceAdminMutationFn = Apollo.MutationFunction<UpdateOrdinanceAdminMutation, UpdateOrdinanceAdminMutationVariables>;

/**
 * __useUpdateOrdinanceAdminMutation__
 *
 * To run a mutation, you first call `useUpdateOrdinanceAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrdinanceAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrdinanceAdminMutation, { data, loading, error }] = useUpdateOrdinanceAdminMutation({
 *   variables: {
 *      number: // value for 'number'
 *      effectiveStartDate: // value for 'effectiveStartDate'
 *      ordinanceType: // value for 'ordinanceType'
 *      effectiveEndDate: // value for 'effectiveEndDate'
 *      subject: // value for 'subject'
 *   },
 * });
 */
export function useUpdateOrdinanceAdminMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrdinanceAdminMutation, UpdateOrdinanceAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrdinanceAdminMutation, UpdateOrdinanceAdminMutationVariables>(UpdateOrdinanceAdminDocument, options);
      }
export type UpdateOrdinanceAdminMutationHookResult = ReturnType<typeof useUpdateOrdinanceAdminMutation>;
export type UpdateOrdinanceAdminMutationResult = Apollo.MutationResult<UpdateOrdinanceAdminMutation>;
export type UpdateOrdinanceAdminMutationOptions = Apollo.BaseMutationOptions<UpdateOrdinanceAdminMutation, UpdateOrdinanceAdminMutationVariables>;
export const UpdateOrdinanceMemberDocument = gql`
    mutation updateOrdinanceMember($id: ID!, $ordinanceId: ID!) {
  updateOrdinanceMember(
    data: {ordinanceWorkload: {connect: {Ordinance: {where: {id: $ordinanceId}}}}}
    where: {id: $id}
  ) {
    id
  }
}
    `;
export type UpdateOrdinanceMemberMutationFn = Apollo.MutationFunction<UpdateOrdinanceMemberMutation, UpdateOrdinanceMemberMutationVariables>;

/**
 * __useUpdateOrdinanceMemberMutation__
 *
 * To run a mutation, you first call `useUpdateOrdinanceMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrdinanceMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrdinanceMemberMutation, { data, loading, error }] = useUpdateOrdinanceMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      ordinanceId: // value for 'ordinanceId'
 *   },
 * });
 */
export function useUpdateOrdinanceMemberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrdinanceMemberMutation, UpdateOrdinanceMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrdinanceMemberMutation, UpdateOrdinanceMemberMutationVariables>(UpdateOrdinanceMemberDocument, options);
      }
export type UpdateOrdinanceMemberMutationHookResult = ReturnType<typeof useUpdateOrdinanceMemberMutation>;
export type UpdateOrdinanceMemberMutationResult = Apollo.MutationResult<UpdateOrdinanceMemberMutation>;
export type UpdateOrdinanceMemberMutationOptions = Apollo.BaseMutationOptions<UpdateOrdinanceMemberMutation, UpdateOrdinanceMemberMutationVariables>;
export const GetMembersByMatriculaDocument = gql`
    query GetMembersByMatricula($matricula: Int!) {
  member(where: {matriculaSiape: $matricula}, stage: DRAFT) {
    id
    name
    matriculaSiape
    ordinances {
      ... on Ordinance {
        id
        number
      }
    }
  }
}
    `;

/**
 * __useGetMembersByMatriculaQuery__
 *
 * To run a query within a React component, call `useGetMembersByMatriculaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersByMatriculaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersByMatriculaQuery({
 *   variables: {
 *      matricula: // value for 'matricula'
 *   },
 * });
 */
export function useGetMembersByMatriculaQuery(baseOptions: Apollo.QueryHookOptions<GetMembersByMatriculaQuery, GetMembersByMatriculaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembersByMatriculaQuery, GetMembersByMatriculaQueryVariables>(GetMembersByMatriculaDocument, options);
      }
export function useGetMembersByMatriculaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembersByMatriculaQuery, GetMembersByMatriculaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembersByMatriculaQuery, GetMembersByMatriculaQueryVariables>(GetMembersByMatriculaDocument, options);
        }
export type GetMembersByMatriculaQueryHookResult = ReturnType<typeof useGetMembersByMatriculaQuery>;
export type GetMembersByMatriculaLazyQueryHookResult = ReturnType<typeof useGetMembersByMatriculaLazyQuery>;
export type GetMembersByMatriculaQueryResult = Apollo.QueryResult<GetMembersByMatriculaQuery, GetMembersByMatriculaQueryVariables>;
export const GetMembersByNameDocument = gql`
    query GetMembersByName($name: String!) {
  members(stage: DRAFT, where: {name_starts_with: $name, ordinances_empty: false}) {
    id
    name
    matriculaSiape
  }
}
    `;

/**
 * __useGetMembersByNameQuery__
 *
 * To run a query within a React component, call `useGetMembersByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetMembersByNameQuery(baseOptions: Apollo.QueryHookOptions<GetMembersByNameQuery, GetMembersByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembersByNameQuery, GetMembersByNameQueryVariables>(GetMembersByNameDocument, options);
      }
export function useGetMembersByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembersByNameQuery, GetMembersByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembersByNameQuery, GetMembersByNameQueryVariables>(GetMembersByNameDocument, options);
        }
export type GetMembersByNameQueryHookResult = ReturnType<typeof useGetMembersByNameQuery>;
export type GetMembersByNameLazyQueryHookResult = ReturnType<typeof useGetMembersByNameLazyQuery>;
export type GetMembersByNameQueryResult = Apollo.QueryResult<GetMembersByNameQuery, GetMembersByNameQueryVariables>;
export const GetMembersDocument = gql`
    query GetMembers {
  members(stage: DRAFT) {
    id
    name
    matriculaSiape
    ordinanceMember {
      id
      memberType
      workload
      memberWorkload {
        ... on Member {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
      }
export function useGetMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
        }
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>;
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>;
export type GetMembersQueryResult = Apollo.QueryResult<GetMembersQuery, GetMembersQueryVariables>;
export const GetOrdinanceByNumberDocument = gql`
    query GetOrdinanceByNumber($number: String!) {
  ordinance(where: {number: $number}, stage: DRAFT) {
    id
    number
    ordinanceType
    effectiveStartDate
    effectiveEndDate
    subject
    members {
      id
      name
      matriculaSiape
      ordinanceMember {
        id
        memberType
        workload
        memberWorkload {
          ... on Member {
            id
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrdinanceByNumberQuery__
 *
 * To run a query within a React component, call `useGetOrdinanceByNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdinanceByNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdinanceByNumberQuery({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useGetOrdinanceByNumberQuery(baseOptions: Apollo.QueryHookOptions<GetOrdinanceByNumberQuery, GetOrdinanceByNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdinanceByNumberQuery, GetOrdinanceByNumberQueryVariables>(GetOrdinanceByNumberDocument, options);
      }
export function useGetOrdinanceByNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdinanceByNumberQuery, GetOrdinanceByNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdinanceByNumberQuery, GetOrdinanceByNumberQueryVariables>(GetOrdinanceByNumberDocument, options);
        }
export type GetOrdinanceByNumberQueryHookResult = ReturnType<typeof useGetOrdinanceByNumberQuery>;
export type GetOrdinanceByNumberLazyQueryHookResult = ReturnType<typeof useGetOrdinanceByNumberLazyQuery>;
export type GetOrdinanceByNumberQueryResult = Apollo.QueryResult<GetOrdinanceByNumberQuery, GetOrdinanceByNumberQueryVariables>;
export const GetOrdinancesAllDocument = gql`
    query GetOrdinancesAll($number: String, $matricula: Int, $name: String, $ordinanceType: OrdinanceType, $memberType: MemberType) {
  ordinance(where: {number: $number}) {
    id
    number
    ordinanceType
    effectiveStartDate
    effectiveEndDate
    subject
    members {
      id
      name
      matriculaSiape
      ordinanceMember {
        id
        memberType
        workload
        memberWorkload {
          ... on Member {
            id
          }
        }
      }
    }
  }
  member(where: {matriculaSiape: $matricula}) {
    id
    name
    matriculaSiape
    ordinances {
      ... on Ordinance {
        id
        number
        ordinanceType
        effectiveStartDate
        effectiveEndDate
        subject
      }
    }
    ordinanceMember {
      id
      memberType
      workload
      memberWorkload {
        ... on Member {
          id
        }
      }
    }
  }
  members(where: {name_starts_with: $name}) {
    name
    ordinances {
      ... on Ordinance {
        number
        ordinanceType
        effectiveStartDate
        effectiveEndDate
      }
    }
  }
  ordinances(
    where: {ordinanceType: $ordinanceType}
    orderBy: effectiveStartDate_ASC
  ) {
    id
    number
    ordinanceType
    effectiveStartDate
    effectiveEndDate
    members {
      name
    }
  }
  ordinanceMembers(where: {memberType: $memberType}) {
    memberType
    memberWorkload {
      ... on Member {
        id
        name
        ordinances {
          ... on Ordinance {
            id
            number
            ordinanceType
            effectiveStartDate
            effectiveEndDate
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrdinancesAllQuery__
 *
 * To run a query within a React component, call `useGetOrdinancesAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdinancesAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdinancesAllQuery({
 *   variables: {
 *      number: // value for 'number'
 *      matricula: // value for 'matricula'
 *      name: // value for 'name'
 *      ordinanceType: // value for 'ordinanceType'
 *      memberType: // value for 'memberType'
 *   },
 * });
 */
export function useGetOrdinancesAllQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdinancesAllQuery, GetOrdinancesAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdinancesAllQuery, GetOrdinancesAllQueryVariables>(GetOrdinancesAllDocument, options);
      }
export function useGetOrdinancesAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdinancesAllQuery, GetOrdinancesAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdinancesAllQuery, GetOrdinancesAllQueryVariables>(GetOrdinancesAllDocument, options);
        }
export type GetOrdinancesAllQueryHookResult = ReturnType<typeof useGetOrdinancesAllQuery>;
export type GetOrdinancesAllLazyQueryHookResult = ReturnType<typeof useGetOrdinancesAllLazyQuery>;
export type GetOrdinancesAllQueryResult = Apollo.QueryResult<GetOrdinancesAllQuery, GetOrdinancesAllQueryVariables>;
export const GetOrdinancesAsideDocument = gql`
    query GetOrdinancesAside {
  ordinances(orderBy: effectiveStartDate_ASC, stage: DRAFT) {
    id
    number
    ordinanceType
    subject
    members {
      name
    }
  }
}
    `;

/**
 * __useGetOrdinancesAsideQuery__
 *
 * To run a query within a React component, call `useGetOrdinancesAsideQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdinancesAsideQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdinancesAsideQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdinancesAsideQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdinancesAsideQuery, GetOrdinancesAsideQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdinancesAsideQuery, GetOrdinancesAsideQueryVariables>(GetOrdinancesAsideDocument, options);
      }
export function useGetOrdinancesAsideLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdinancesAsideQuery, GetOrdinancesAsideQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdinancesAsideQuery, GetOrdinancesAsideQueryVariables>(GetOrdinancesAsideDocument, options);
        }
export type GetOrdinancesAsideQueryHookResult = ReturnType<typeof useGetOrdinancesAsideQuery>;
export type GetOrdinancesAsideLazyQueryHookResult = ReturnType<typeof useGetOrdinancesAsideLazyQuery>;
export type GetOrdinancesAsideQueryResult = Apollo.QueryResult<GetOrdinancesAsideQuery, GetOrdinancesAsideQueryVariables>;
export const GetOrdinancesByDateDocument = gql`
    query GetOrdinancesByDate($dateStart: Date!, $dateEnd: Date!) {
  ordinances(
    where: {effectiveStartDate_gte: $dateStart, effectiveStartDate_lte: $dateEnd}
    orderBy: effectiveStartDate_ASC
    stage: DRAFT
  ) {
    id
    number
    ordinanceType
    effectiveStartDate
    effectiveEndDate
    members {
      name
    }
  }
}
    `;

/**
 * __useGetOrdinancesByDateQuery__
 *
 * To run a query within a React component, call `useGetOrdinancesByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdinancesByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdinancesByDateQuery({
 *   variables: {
 *      dateStart: // value for 'dateStart'
 *      dateEnd: // value for 'dateEnd'
 *   },
 * });
 */
export function useGetOrdinancesByDateQuery(baseOptions: Apollo.QueryHookOptions<GetOrdinancesByDateQuery, GetOrdinancesByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdinancesByDateQuery, GetOrdinancesByDateQueryVariables>(GetOrdinancesByDateDocument, options);
      }
export function useGetOrdinancesByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdinancesByDateQuery, GetOrdinancesByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdinancesByDateQuery, GetOrdinancesByDateQueryVariables>(GetOrdinancesByDateDocument, options);
        }
export type GetOrdinancesByDateQueryHookResult = ReturnType<typeof useGetOrdinancesByDateQuery>;
export type GetOrdinancesByDateLazyQueryHookResult = ReturnType<typeof useGetOrdinancesByDateLazyQuery>;
export type GetOrdinancesByDateQueryResult = Apollo.QueryResult<GetOrdinancesByDateQuery, GetOrdinancesByDateQueryVariables>;
export const GetOrdinancesByMemberMatriculaDocument = gql`
    query GetOrdinancesByMemberMatricula($matriculaSiape: Int!) {
  member(where: {matriculaSiape: $matriculaSiape}) {
    id
    name
    matriculaSiape
    ordinanceMember {
      id
      memberType
      workload
      ordinanceWorkload {
        ... on Ordinance {
          id
          number
          ordinanceType
          effectiveStartDate
          effectiveEndDate
          subject
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrdinancesByMemberMatriculaQuery__
 *
 * To run a query within a React component, call `useGetOrdinancesByMemberMatriculaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdinancesByMemberMatriculaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdinancesByMemberMatriculaQuery({
 *   variables: {
 *      matriculaSiape: // value for 'matriculaSiape'
 *   },
 * });
 */
export function useGetOrdinancesByMemberMatriculaQuery(baseOptions: Apollo.QueryHookOptions<GetOrdinancesByMemberMatriculaQuery, GetOrdinancesByMemberMatriculaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdinancesByMemberMatriculaQuery, GetOrdinancesByMemberMatriculaQueryVariables>(GetOrdinancesByMemberMatriculaDocument, options);
      }
export function useGetOrdinancesByMemberMatriculaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdinancesByMemberMatriculaQuery, GetOrdinancesByMemberMatriculaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdinancesByMemberMatriculaQuery, GetOrdinancesByMemberMatriculaQueryVariables>(GetOrdinancesByMemberMatriculaDocument, options);
        }
export type GetOrdinancesByMemberMatriculaQueryHookResult = ReturnType<typeof useGetOrdinancesByMemberMatriculaQuery>;
export type GetOrdinancesByMemberMatriculaLazyQueryHookResult = ReturnType<typeof useGetOrdinancesByMemberMatriculaLazyQuery>;
export type GetOrdinancesByMemberMatriculaQueryResult = Apollo.QueryResult<GetOrdinancesByMemberMatriculaQuery, GetOrdinancesByMemberMatriculaQueryVariables>;
export const GetOrdinancesByMemberNameDocument = gql`
    query GetOrdinancesByMemberName($name: String!) {
  members(where: {name_starts_with: $name, ordinances_empty: false}, stage: DRAFT) {
    name
    id
    ordinanceMember {
      workload
      ordinanceWorkload {
        ... on Ordinance {
          id
          number
          effectiveEndDate
          effectiveStartDate
          ordinanceType
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrdinancesByMemberNameQuery__
 *
 * To run a query within a React component, call `useGetOrdinancesByMemberNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdinancesByMemberNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdinancesByMemberNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetOrdinancesByMemberNameQuery(baseOptions: Apollo.QueryHookOptions<GetOrdinancesByMemberNameQuery, GetOrdinancesByMemberNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdinancesByMemberNameQuery, GetOrdinancesByMemberNameQueryVariables>(GetOrdinancesByMemberNameDocument, options);
      }
export function useGetOrdinancesByMemberNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdinancesByMemberNameQuery, GetOrdinancesByMemberNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdinancesByMemberNameQuery, GetOrdinancesByMemberNameQueryVariables>(GetOrdinancesByMemberNameDocument, options);
        }
export type GetOrdinancesByMemberNameQueryHookResult = ReturnType<typeof useGetOrdinancesByMemberNameQuery>;
export type GetOrdinancesByMemberNameLazyQueryHookResult = ReturnType<typeof useGetOrdinancesByMemberNameLazyQuery>;
export type GetOrdinancesByMemberNameQueryResult = Apollo.QueryResult<GetOrdinancesByMemberNameQuery, GetOrdinancesByMemberNameQueryVariables>;
export const GetOrdinancesByMemberTypeDocument = gql`
    query GetOrdinancesByMemberType($memberType: MemberType) {
  ordinanceMembers(where: {memberType: $memberType}, stage: DRAFT) {
    workload
    memberType
    memberWorkload {
      ... on Member {
        id
        name
        ordinances {
          ... on Ordinance {
            id
            number
            ordinanceType
            effectiveStartDate
            effectiveEndDate
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrdinancesByMemberTypeQuery__
 *
 * To run a query within a React component, call `useGetOrdinancesByMemberTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdinancesByMemberTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdinancesByMemberTypeQuery({
 *   variables: {
 *      memberType: // value for 'memberType'
 *   },
 * });
 */
export function useGetOrdinancesByMemberTypeQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdinancesByMemberTypeQuery, GetOrdinancesByMemberTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdinancesByMemberTypeQuery, GetOrdinancesByMemberTypeQueryVariables>(GetOrdinancesByMemberTypeDocument, options);
      }
export function useGetOrdinancesByMemberTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdinancesByMemberTypeQuery, GetOrdinancesByMemberTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdinancesByMemberTypeQuery, GetOrdinancesByMemberTypeQueryVariables>(GetOrdinancesByMemberTypeDocument, options);
        }
export type GetOrdinancesByMemberTypeQueryHookResult = ReturnType<typeof useGetOrdinancesByMemberTypeQuery>;
export type GetOrdinancesByMemberTypeLazyQueryHookResult = ReturnType<typeof useGetOrdinancesByMemberTypeLazyQuery>;
export type GetOrdinancesByMemberTypeQueryResult = Apollo.QueryResult<GetOrdinancesByMemberTypeQuery, GetOrdinancesByMemberTypeQueryVariables>;
export const GetOrdinancesByTypeDocument = gql`
    query GetOrdinancesByType($ordinanceType: OrdinanceType!) {
  ordinances(
    where: {ordinanceType: $ordinanceType}
    orderBy: effectiveStartDate_ASC
    stage: DRAFT
  ) {
    id
    number
    ordinanceType
    effectiveStartDate
    effectiveEndDate
    members {
      name
    }
  }
}
    `;

/**
 * __useGetOrdinancesByTypeQuery__
 *
 * To run a query within a React component, call `useGetOrdinancesByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdinancesByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdinancesByTypeQuery({
 *   variables: {
 *      ordinanceType: // value for 'ordinanceType'
 *   },
 * });
 */
export function useGetOrdinancesByTypeQuery(baseOptions: Apollo.QueryHookOptions<GetOrdinancesByTypeQuery, GetOrdinancesByTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdinancesByTypeQuery, GetOrdinancesByTypeQueryVariables>(GetOrdinancesByTypeDocument, options);
      }
export function useGetOrdinancesByTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdinancesByTypeQuery, GetOrdinancesByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdinancesByTypeQuery, GetOrdinancesByTypeQueryVariables>(GetOrdinancesByTypeDocument, options);
        }
export type GetOrdinancesByTypeQueryHookResult = ReturnType<typeof useGetOrdinancesByTypeQuery>;
export type GetOrdinancesByTypeLazyQueryHookResult = ReturnType<typeof useGetOrdinancesByTypeLazyQuery>;
export type GetOrdinancesByTypeQueryResult = Apollo.QueryResult<GetOrdinancesByTypeQuery, GetOrdinancesByTypeQueryVariables>;
export const GetOrdinancesDocument = gql`
    query GetOrdinances {
  ordinances(orderBy: effectiveEndDate_ASC, stage: DRAFT) {
    id
    number
    effectiveEndDate
    effectiveStartDate
    members {
      id
      name
      matriculaSiape
      ordinanceMember {
        id
        memberType
        workload
        memberWorkload {
          ... on Member {
            id
          }
        }
      }
    }
    ordinanceType
    subject
  }
}
    `;

/**
 * __useGetOrdinancesQuery__
 *
 * To run a query within a React component, call `useGetOrdinancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdinancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdinancesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdinancesQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdinancesQuery, GetOrdinancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdinancesQuery, GetOrdinancesQueryVariables>(GetOrdinancesDocument, options);
      }
export function useGetOrdinancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdinancesQuery, GetOrdinancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdinancesQuery, GetOrdinancesQueryVariables>(GetOrdinancesDocument, options);
        }
export type GetOrdinancesQueryHookResult = ReturnType<typeof useGetOrdinancesQuery>;
export type GetOrdinancesLazyQueryHookResult = ReturnType<typeof useGetOrdinancesLazyQuery>;
export type GetOrdinancesQueryResult = Apollo.QueryResult<GetOrdinancesQuery, GetOrdinancesQueryVariables>;
export const GetUserAdminDocument = gql`
    query GetUserAdmin($email: String!) {
  userAdmin(where: {email: $email}, stage: DRAFT) {
    id
    email
  }
}
    `;

/**
 * __useGetUserAdminQuery__
 *
 * To run a query within a React component, call `useGetUserAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAdminQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserAdminQuery(baseOptions: Apollo.QueryHookOptions<GetUserAdminQuery, GetUserAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAdminQuery, GetUserAdminQueryVariables>(GetUserAdminDocument, options);
      }
export function useGetUserAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAdminQuery, GetUserAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAdminQuery, GetUserAdminQueryVariables>(GetUserAdminDocument, options);
        }
export type GetUserAdminQueryHookResult = ReturnType<typeof useGetUserAdminQuery>;
export type GetUserAdminLazyQueryHookResult = ReturnType<typeof useGetUserAdminLazyQuery>;
export type GetUserAdminQueryResult = Apollo.QueryResult<GetUserAdminQuery, GetUserAdminQueryVariables>;
export const GetUserAdminsDocument = gql`
    query GetUserAdmins {
  userAdmins(stage: DRAFT) {
    id
    email
    userAdminType
  }
}
    `;

/**
 * __useGetUserAdminsQuery__
 *
 * To run a query within a React component, call `useGetUserAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAdminsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserAdminsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserAdminsQuery, GetUserAdminsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAdminsQuery, GetUserAdminsQueryVariables>(GetUserAdminsDocument, options);
      }
export function useGetUserAdminsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAdminsQuery, GetUserAdminsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAdminsQuery, GetUserAdminsQueryVariables>(GetUserAdminsDocument, options);
        }
export type GetUserAdminsQueryHookResult = ReturnType<typeof useGetUserAdminsQuery>;
export type GetUserAdminsLazyQueryHookResult = ReturnType<typeof useGetUserAdminsLazyQuery>;
export type GetUserAdminsQueryResult = Apollo.QueryResult<GetUserAdminsQuery, GetUserAdminsQueryVariables>;