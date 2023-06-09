import  {VaultModel} from "./vault.modal"

export function createVault(input: {user: string, salt:string}) {
    return VaultModel.create(input)
}

export const updateVault = ({
    userId, data
}: {
    userId: string; data:string;
})=> {
  return VaultModel.updateOne({user: userId}, {data})
}