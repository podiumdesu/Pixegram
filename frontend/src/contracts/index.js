import useContract from '../utils/useContract'
import InitAbiJson from '../abi/Init'

const scAddress = "0x03eD84F70Eab268877760a5689cF7303FE99C939"
const etdAddress = "0x042511E2be3842697Cfc00b7DbbdF98C9e552511"
const rinkAddress = "0x8f36E7bD959Ef8CA0B45bacf2b604A3114Dbd55A"

export const initContract = useContract(etdAddress, InitAbiJson)
