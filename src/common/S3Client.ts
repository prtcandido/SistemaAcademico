import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const client = new S3Client({
  region: process.env.BUCKET_REGION,
  endpoint: String(process.env.BUCKET_ENDPOINT),
  forcePathStyle: true,
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  },
});

export class S3ClientService {
  async sendFile(fileName: string, fileData: any) {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: fileData,
      CacheControl: 'max-age=3600',
      ContentType: 'application/pdf',
    });

    try {
      const response = await client.send(command);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async getFile(fileName: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    });

    try {
      const response = await client.send(command);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}
