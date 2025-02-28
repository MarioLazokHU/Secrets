import Secret from "../Models/Secret.js";
import crypto from "crypto";
import { addMinutes } from "date-fns";

class SecretService {
  async viewSecret(hash) {
    try {
      const secret = await Secret.findOne({ hash: hash });

      if (!secret) {
        return { error: "Secret not found", success: false };
      }

      if (secret.views >= secret.expiredAfterViews) {
        return { error: "Secret expired", success: false };
      }

      const expirationDate = addMinutes(
        new Date(secret.createdAt),
        secret.expireAfter
      );
      if (expirationDate < Date.now()) {
        return { error: "Secret expired", success: false };
      }

      secret.views += 1;
      await secret.save();

      return { secret: secret.secret };
    } catch (e) {
      console.error(e.message);
      return { error: e.message };
    }
  }

  async createSecret(data) {
    try {
      const secret = new Secret({
        hash: crypto.createHash("sha256").update(data.secret).digest("hex"),
        secret: data.secret,
        expiredAfterViews: data.expiredAfterViews,
        expireAfter: data.expireAfter,
      });

      await secret.save();

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async listSecrets() {
    const data = await Secret.find({}, { secret: 0 }).sort({ createdAt: -1 });
    const secrets = data.map((secret) => {
      const expirationDate = addMinutes(
        new Date(secret.createdAt),
        secret.expireAfter
      );
      const expired =
        secret.views >= secret.expiredAfterViews || expirationDate < new Date();
      return { ...secret._doc, expirationDate, expired };
    });
    return secrets;
  }
}

export default SecretService;