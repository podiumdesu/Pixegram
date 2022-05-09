import useContract from '../utils/useContract'

const scAddress = "0x03eD84F70Eab268877760a5689cF7303FE99C939"
const etdAddress = "0x8aD576d262833AaAc5Bd53E375e90Cdb63250a53"
const rinkAddress = "0xbc0481215C41bB8128185e58F90E4b96c263ade5"
import InitAbiJson from '../abi/Init'

export const initContract = useContract(rinkAddress, InitAbiJson)
