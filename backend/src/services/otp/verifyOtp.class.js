import axios from 'axios';

export default class VerifyOtpService {
  async create(data) {
    const { sessionId, otp } = data;
    const apiKey = process.env.TWO_FACTOR_API_KEY;

    const url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`;

    try {
      const response = await axios.get(url);

      if (response.data.Details === 'OTP Matched') {
        return { success: true };
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      throw new Error('OTP verification failed');
    }
  }
}
