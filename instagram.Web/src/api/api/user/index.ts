/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import { createUserDtoFromDiscriminatorValue, type UserDto } from '../../models/index.js';
// @ts-ignore
import { type BaseRequestBuilder, type Parsable, type ParsableFactory, type RequestConfiguration, type RequestInformation, type RequestsMetadata } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /api/user
 */
export interface UserRequestBuilder extends BaseRequestBuilder<UserRequestBuilder> {
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<UserDto>}
     */
     get(requestConfiguration?: RequestConfiguration<object> | undefined) : Promise<UserDto | undefined>;
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
     toGetRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined) : RequestInformation;
}
/**
 * Uri template for the request builder.
 */
export const UserRequestBuilderUriTemplate = "{+baseurl}/api/user";
/**
 * Metadata for all the requests in the request builder.
 */
export const UserRequestBuilderRequestsMetadata: RequestsMetadata = {
    get: {
        uriTemplate: UserRequestBuilderUriTemplate,
        responseBodyContentType: "application/json",
        adapterMethodName: "send",
        responseBodyFactory:  createUserDtoFromDiscriminatorValue,
    },
};
/* tslint:enable */
/* eslint-enable */
