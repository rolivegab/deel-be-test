import { Op } from "@sequelize/core";
import Sequelize from "@sequelize/core";
import { ContractModel, ContractStatus } from "../models/contract.model";
import { JobModel } from "../models/job.model";
import { ProfileModel, ProfileType } from "../models/profile.model";

const findByPk = async (profileId: number) => {
  return await JobModel.findByPk(profileId);
};

const findOneByIdAndPaid = async (
  jobId: number,
  paid: boolean,
  transaction?: Sequelize.Transaction
) => {
  return await JobModel.findOne({
    where: {
      id: jobId,
      paid,
    },
    transaction,
  });
};

const findAllByProfileIdAndStatus = async (
  profileId: number,
  status: ContractStatus,
  transaction?: Sequelize.Transaction
) => {
  return await JobModel.findAll({
    include: {
      model: ContractModel,
      as: "contract",
      attributes: [],
      where: {
        status,
        [Op.or]: [
          {
            contractorId: profileId,
          },
          {
            clientId: profileId,
          },
        ],
      },
    },
    transaction,
  });
};

const findBestProfessionInRange = async (startDate: Date, endDate: Date) => {
  return await JobModel.findAll({
    attributes: ["id", [Sequelize.fn("sum", Sequelize.col("price")), "amount"]],
    group: [
      "Job.id",
      "contract->contractor.profession",
      "contract.id",
      "contract->contractor.id",
    ],
    where: {
      paymentDate: {
        [Op.gte]: startDate.toISOString(),
        [Op.lt]: endDate.toISOString(),
      },
    },
    limit: 1,
    include: [
      {
        model: ContractModel,
        as: "contract",
        include: [
          {
            model: ProfileModel,
            as: "contractor",
            foreignKey: "contractorId",
            required: true,
          },
        ],
        required: true,
      },
    ],
    order: [[Sequelize.col("amount"), "desc"]],
  });
};

const findBestClientsInRange = async (
  startDate: Date,
  endDate: Date,
  limit?: number
) => {
  return await JobModel.findAll({
    where: {
      paymentDate: {
        [Op.gte]: startDate.toISOString(),
        [Op.lt]: endDate.toISOString(),
      },
    },
    attributes: [
      "id",
      [
        Sequelize.fn(
          "CONCAT",
          Sequelize.col("firstName"),
          " ",
          Sequelize.col("lastName")
        ),
        "fullName",
      ],
      [Sequelize.fn("sum", Sequelize.col("price")), "paid"],
    ],
    group: ["contract->client.id", "Job.id", "contract.id"],
    limit,
    include: {
      model: ContractModel,
      as: "contract",
      attributes: [],
      include: [
        {
          model: ProfileModel,
          as: "client",
        },
      ],
      required: true,
    },
    order: [[Sequelize.col("paid"), "desc"]],
  });
};

export const jobsService = {
  findAllByProfileIdAndStatus,
  findByPk,
  findOneByIdAndPaid,
  findBestProfessionInRange,
  findBestClientsInRange,
};
