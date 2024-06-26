import { EndpointId } from '@layerzerolabs/lz-definitions'
import { withLayerZeroArtifacts, withLayerZeroDeployments } from '@/config'
import { dirname, join } from 'path'

describe('config', () => {
    describe('withLayerZeroDeployments()', () => {
        const resolvedLzEvmSdkPackageJson = dirname(
            require.resolve(join('@layerzerolabs/lz-evm-sdk-v1', 'package.json'))
        )

        it('should add no external deployments if no networks have been specified', () => {
            const config = {}

            expect(withLayerZeroDeployments('@layerzerolabs/lz-evm-sdk-v1')(config)).toEqual({
                external: {
                    deployments: {},
                },
            })
        })

        it('should not add external deployments for networks without eid', () => {
            const config = {
                networks: {
                    'vengaboys-testnet': {},
                },
            }

            expect(withLayerZeroDeployments('@layerzerolabs/lz-evm-sdk-v1')(config)).toEqual({
                networks: {
                    'vengaboys-testnet': {},
                },
                external: {
                    deployments: {},
                },
            })
        })

        it('should not add external deployments for networks with invalid eid', () => {
            const config = {
                networks: {
                    'vengaboys-testnet': {
                        eid: 0,
                    },
                },
            }

            expect(withLayerZeroDeployments('@layerzerolabs/lz-evm-sdk-v1')(config)).toEqual({
                networks: {
                    'vengaboys-testnet': {
                        eid: 0,
                    },
                },
                external: {
                    deployments: {},
                },
            })
        })

        it('should append external deployments for all networks', () => {
            const config = {
                networks: {
                    'vengaboys-testnet': {
                        eid: EndpointId.ARBITRUM_MAINNET,
                    },
                },
            }

            expect(withLayerZeroDeployments('@layerzerolabs/lz-evm-sdk-v1')(config)).toEqual({
                networks: {
                    'vengaboys-testnet': {
                        eid: EndpointId.ARBITRUM_MAINNET,
                    },
                },
                external: {
                    deployments: {
                        'vengaboys-testnet': [join(resolvedLzEvmSdkPackageJson, 'deployments', 'arbitrum-mainnet')],
                    },
                },
            })
        })

        it('should append local deployments is isLocalEid is truthy', () => {
            const config = {
                networks: {
                    'vengaboys-testnet': {
                        eid: EndpointId.ARBITRUM_MAINNET,
                        isLocalEid: true,
                    },
                },
            }

            expect(withLayerZeroDeployments('@layerzerolabs/lz-evm-sdk-v1')(config)).toEqual({
                networks: {
                    'vengaboys-testnet': {
                        eid: EndpointId.ARBITRUM_MAINNET,
                        isLocalEid: true,
                    },
                },
                external: {
                    deployments: {
                        'vengaboys-testnet': [
                            join(resolvedLzEvmSdkPackageJson, 'deployments', 'arbitrum-mainnet-local'),
                        ],
                    },
                },
            })
        })

        it('should not append duplicate external deployments for all networks', () => {
            const config = {
                networks: {
                    'vengaboys-testnet': {
                        eid: EndpointId.BSC_TESTNET,
                    },
                },
            }

            const configWithSomePath = withLayerZeroDeployments(
                '@layerzerolabs/lz-evm-sdk-v1',
                '@layerzerolabs/lz-evm-sdk-v1'
            )(config)
            const configWithSomePathAgain = withLayerZeroDeployments('@layerzerolabs/lz-evm-sdk-v1')(configWithSomePath)

            expect(configWithSomePathAgain).toEqual({
                networks: {
                    'vengaboys-testnet': {
                        eid: EndpointId.BSC_TESTNET,
                    },
                },
                external: {
                    deployments: {
                        'vengaboys-testnet': [join(resolvedLzEvmSdkPackageJson, 'deployments', 'bsc-testnet')],
                    },
                },
            })
        })
    })

    describe('withLayerZeroArtifacts()', () => {
        const resolvedLzEvmSdkPackageJson = dirname(
            require.resolve(join('@layerzerolabs/lz-evm-sdk-v1', 'package.json'))
        )

        it('should append external artifacts', () => {
            const config = {
                networks: {},
            }

            expect(withLayerZeroArtifacts('@layerzerolabs/lz-evm-sdk-v1')(config)).toEqual({
                networks: {},
                external: {
                    contracts: [
                        {
                            artifacts: [`${resolvedLzEvmSdkPackageJson}/artifacts`],
                        },
                    ],
                },
            })
        })

        it('should not append duplicate external artifacts', () => {
            const config = {
                external: {
                    contracts: [
                        {
                            artifacts: './my/external/artifact',
                        },
                        {
                            artifacts: ['./my/other/external/artifact'],
                        },
                    ],
                },
                networks: {},
            }

            const configWithSomePath = withLayerZeroArtifacts(
                '@layerzerolabs/lz-evm-sdk-v1',
                '@layerzerolabs/lz-evm-sdk-v1'
            )(config)
            const configWithSomePathAgain = withLayerZeroArtifacts('@layerzerolabs/lz-evm-sdk-v1')(configWithSomePath)

            expect(configWithSomePathAgain).toEqual({
                networks: {},
                external: {
                    contracts: [
                        {
                            artifacts: './my/external/artifact',
                        },
                        {
                            artifacts: ['./my/other/external/artifact'],
                        },
                        {
                            artifacts: [`${resolvedLzEvmSdkPackageJson}/artifacts`],
                        },
                    ],
                },
            })
        })
    })
})
