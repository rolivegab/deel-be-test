import { Op } from "@sequelize/core";
import { NotFoundException } from "../exceptions/NotFound.exception";
import { ContractModel } from "../models/contract.model";

const findByPk = async (contractId: number) => {
  const contract = await ContractModel.findByPk(contractId);
  if (!contract) throw new NotFoundException("Contract not found");
  return contract;
};

const findAllByProfileId = async (profileId: number) => {
  const contracts = await ContractModel.findAll({
    where: {
      [Op.or]: [
        {
          contractorId: profileId,
        },
        {
          clientId: profileId,
        },
      ],
    },
  });
  return contracts;
};

export const contractsService = {
  findByPk,
  findAllByProfileId,
};
