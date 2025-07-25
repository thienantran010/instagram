/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import { createHttpValidationProblemDetailsFromDiscriminatorValue, createInfoResponseFromDiscriminatorValue, serializeInfoRequest, serializeInfoResponse, type HttpValidationProblemDetails, type InfoRequest, type InfoResponse } from '../../models/index.js';
// @ts-ignore
import { type BaseRequestBuilder, type Parsable, type ParsableFactory, type RequestConfiguration, type RequestInformation, type RequestsMetadata } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /manage/info
 */
export interface InfoRequestBuilder extends BaseRequestBuilder<InfoRequestBuilder> {
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<InfoResponse>}
     * @throws {HttpValidationProblemDetails} error when the service returns a 400 status code
     */
     get(requestConfiguration?: RequestConfiguration<object> | undefined) : Promise<InfoResponse | undefined>;
    /**
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<InfoResponse>}
     * @throws {HttpValidationProblemDetails} error when the service returns a 400 status code
     */
     post(body: InfoRequest, requestConfiguration?: RequestConfiguration<object> | undefined) : Promise<InfoResponse | undefined>;
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
     toGetRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined) : RequestInformation;
    /**
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
     toPostRequestInformation(body: InfoRequest, requestConfiguration?: RequestConfiguration<object> | undefined) : RequestInformation;
}
/**
 * Uri template for the request builder.
 */
export const InfoRequestBuilderUriTemplate = "{+baseurl}/manage/info";
/**
 * Metadata for all the requests in the request builder.
 */
export const InfoRequestBuilderRequestsMetadata: RequestsMetadata = {
    get: {
        uriTemplate: InfoRequestBuilderUriTemplate,
        responseBodyContentType: "application/json",
        errorMappings: {
            400: createHttpValidationProblemDetailsFromDiscriminatorValue as ParsableFactory<Parsable>,
        },
        adapterMethodName: "send",
        responseBodyFactory:  createInfoResponseFromDiscriminatorValue,
    },
    post: {
        uriTemplate: InfoRequestBuilderUriTemplate,
        responseBodyContentType: "application/json",
        errorMappings: {
            400: createHttpValidationProblemDetailsFromDiscriminatorValue as ParsableFactory<Parsable>,
        },
        adapterMethodName: "send",
        responseBodyFactory:  createInfoResponseFromDiscriminatorValue,
        requestBodyContentType: "application/json",
        requestBodySerializer: serializeInfoRequest,
        requestInformationContentSetMethod: "setContentFromParsable",
    },
};
/* tslint:enable */
/* eslint-enable */
