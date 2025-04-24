import axios from 'axios';

export default class OtpService {
  async create(data) {
    const { phoneNumber } = data;
    const apiKey = process.env.TWO_FACTOR_API_KEY;

    const url = `https://2factor.in/API/V1/${apiKey}/SMS/${phoneNumber}/AUTOGEN`;

    try {
      const response = await axios.get(url);
      return { success: true, sessionId: response.data.Details };
    } catch (err) {
      console.error(err.response?.data || err.message);
      throw new Error('Failed to send OTP');
    }
  }
}
