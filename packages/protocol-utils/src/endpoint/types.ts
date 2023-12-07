import type { Address, OmniGraph, OmniPointBasedFactory, OmniTransaction } from '@layerzerolabs/utils'
import type { EndpointId } from '@layerzerolabs/lz-definitions'

export interface IEndpoint {
    defaultReceiveLibrary(eid: EndpointId): Promise<Address | undefined>
    setDefaultReceiveLibrary(
        eid: EndpointId,
        lib: Address | null | undefined,
        gracePeriod?: number
    ): Promise<OmniTransaction>

    defaultSendLibrary(eid: EndpointId): Promise<Address | undefined>
    setDefaultSendLibrary(eid: EndpointId, lib: Address | null | undefined): Promise<OmniTransaction>

    isRegisteredLibrary(lib: Address): Promise<boolean>
    registerLibrary(lib: Address): Promise<OmniTransaction>
}

export interface EndpointEdgeConfig {
    defaultReceiveLibrary: Address
    defaultReceiveLibraryGracePeriod?: number
    defaultSendLibrary: Address
}

export type EndpointOmniGraph = OmniGraph<unknown, EndpointEdgeConfig>

export type EndpointFactory = OmniPointBasedFactory<IEndpoint>