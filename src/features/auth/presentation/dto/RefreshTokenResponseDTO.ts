export interface RefreshTokenResponseDTO {
  access_token: string;
  expire_date: Date;
  refresh_token: string;
  refresh_expire_date: Date;
}
