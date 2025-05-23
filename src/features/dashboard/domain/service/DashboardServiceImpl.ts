/* eslint-disable no-unused-vars */
import { DashboardAdminDTO } from '@features/dashboard/presentation/dto/DashboardAdminDTO';
import { DashboardSuperAdminDAO } from '../../data/dao/DashboardSuperAdminDAO';
import { DashboardSuperAdminDTO } from '../../presentation/dto/DashboardSuperAdminDTO';
import { DashboardAdminDAO } from '@features/dashboard/data/dao/DashboardAdminDAO';
import { DashboardService } from './DashboardService';
import { DashboardAdvisorDTO } from '@features/dashboard/presentation/dto/DashboardAdvisorDTO';
import { DashboardAdvisorDAO } from '@features/dashboard/data/dao/DashboardAdvisorDAO';

export class DashboardServiceImpl implements DashboardService {
  constructor(
    private readonly superAdminDao: DashboardSuperAdminDAO,
    private readonly adminDao: DashboardAdminDAO,
    private readonly advisorDao: DashboardAdvisorDAO
  ) {}

  async getSuperAdminStatistics(): Promise<DashboardSuperAdminDTO> {
    return {
      totalUsers: await this.superAdminDao.getTotalUsers(),
      totalAdvisors: await this.superAdminDao.getTotalAdvisors(),
      totalAdmins: await this.superAdminDao.getTotalAdmins(),
      pendingSuperAdminValidations:
        await this.superAdminDao.getPendingSuperAdminValidations(),
      totalValidatedFiles: await this.superAdminDao.getTotalValidatedFiles(),
    };
  }

  async getAdminStatistics(userId: string): Promise<DashboardAdminDTO> {
    return {
      filesCreatedByMe: await this.adminDao.getFilesCreatedBy(userId),
      pendingAdminValidations: await this.adminDao.getPendingAdminValidations(),
      validatedByMe: await this.adminDao.getValidatedBy(userId),
    };
  }

  async getAdvisorStatistics(userId: string): Promise<DashboardAdvisorDTO> {
    return {
      filesCreatedByMe: await this.advisorDao.getFilesCreatedBy(userId),
      filesValidated: await this.advisorDao.getValidatedFilesCreatedBy(userId),
    };
  }
}
