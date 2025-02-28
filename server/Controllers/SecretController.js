class SecretController {
    constructor(secretService) {
      this.secretService = secretService;
    }
  
    async viewSecret(req, res) {
      const hash = req.body.hash;
      const secret = await this.secretService.viewSecret(hash);
      if (secret) {
        res.status(200).send(secret);
      } else {
        res.status(500).send();
      }
    }
  
    async createSecret(req, res) {
      const data = await this.secretService.createSecret(req.body);
      if (data.success) {
        res.status(200).send(data);
      } else {
        res.status(500).send();
      }
    }
  
    async listSecrets(req, res) {
      const data = await this.secretService.listSecrets();
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(500).send();
      }
    }
  }
  
  export default SecretController;