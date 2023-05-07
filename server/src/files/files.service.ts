import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FileEntity, FileType} from "./entities/file.entity";
import {Repository} from "typeorm";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>
  )
  {}

  findAll(userId: number, fileType: FileType) {
    const queryBuilder = this.repository.createQueryBuilder('file');

    queryBuilder.where('file.userId = :userId', { userId });

    if (fileType === FileType.PHOTOS) {
      queryBuilder.where('file.mimetype ILIKE :type', { type: '%image%' })
    }

    if (fileType === FileType.TRASH) {
      queryBuilder.withDeleted().andWhere('file.deletedAt IS NOT NULL')
    }

    return queryBuilder.getMany();
  }

  create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId }
    })
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const queryBuilder = this.repository.createQueryBuilder('file');

    queryBuilder.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    })

    return queryBuilder.softDelete().execute();
  }
}
