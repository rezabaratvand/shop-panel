import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/common/decorators/api-file.decorator';
import { ApiMultiFile } from 'src/common/decorators/api-multi-file.decorator';
import uploadImage from 'src/configs/upload-image.config';
import uploadMultiImage from 'src/configs/upload-multi-image.config';
import { UploadFileService } from './upload-file.service';

@ApiTags('upload-file')
@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Get('models')
  getModelNames(): string[] {
    return this.uploadFileService.getModelNames();
  }

  @Post('thumbnail/:modelName/:code/:field')
  @ApiConsumes('multipart/form-data')
  @ApiFile('thumbnail')
  @ApiParam({
    name: 'modelName',
    required: true,
    type: 'string',
    description: 'name of model',
    example: 'Category',
  })
  @ApiParam({ name: 'code', required: true, type: 'number' })
  @ApiParam({ name: 'field', required: true, type: 'string' })
  @UseInterceptors(uploadImage('thumbnail'))
  async uploadThumbnail(
    @Param()
    { modelName, code, field }: { modelName: string; code: number; field: string },
    @UploadedFile() file,
  ) {
    return await this.uploadFileService.uploadThumbnail(
      modelName,
      code,
      field,
      file.path,
    );
  }

  @Post('picture/:modelName/:code/:field')
  @ApiConsumes('multipart/form-data')
  @ApiFile('picture')
  @ApiParam({
    name: 'modelName',
    required: true,
    type: 'string',
    description: 'name of model',
    example: 'Category',
  })
  @ApiParam({ name: 'code', required: true, type: 'number' })
  @ApiParam({ name: 'field', required: true, type: 'string' })
  @UseInterceptors(uploadImage('picture', 2 * 1000 * 1000))
  async uploadPicture(
    @Param()
    { modelName, code, field }: { modelName: string; code: number; field: string },
    @UploadedFile() file,
  ) {
    return await this.uploadFileService.uploadPicture(modelName, code, field, file.path);
  }

  @Post('pictures/:modelName/:code/:field')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(uploadMultiImage('picture'))
  @ApiParam({
    name: 'modelName',
    required: true,
    type: 'string',
    description: 'name of model',
    example: 'Category',
  })
  @ApiParam({ name: 'code', required: true, type: 'number', example: 1 })
  @ApiParam({ name: 'field', required: true, type: 'string', example: 'pictures' })
  async uploadFile(
    @Param()
    { modelName, code, field }: { modelName: string; code: number; field: string },
    @UploadedFiles()
    files,
  ) {
    const filePaths = files.map((file) => file.path);
    return await this.uploadFileService.uploadMultiPictures(
      modelName,
      code,
      field,
      filePaths,
    );
  }
}
