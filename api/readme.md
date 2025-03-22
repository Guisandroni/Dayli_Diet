## 🌐 Hospedagem

### Opções para o Backend

#### Opções Gratuitas
- **[Railway](https://railway.app/)**
  - Oferece plano gratuito com 500 horas/mês
  - Suporte nativo a PostgreSQL
  - Deploy automático via GitHub
  - Configuração simples do ambiente

- **[Render](https://render.com/)**
  - Tier gratuito com PostgreSQL
  - CI/CD automático
  - SSL gratuito
  - Bom para projetos pequenos

- **[Fly.io](https://fly.io/)**
  - Tier gratuito generoso
  - Suporte a Docker
  - Distribuição global
  - Bom desempenho

#### Opções Pagas (Mais Robustas)
- **[DigitalOcean](https://www.digitalocean.com/)**
  - Droplets a partir de $5/mês
  - Managed PostgreSQL
  - Interface intuitiva
  - Boa documentação

- **[Heroku](https://www.heroku.com/)**
  - Plataforma madura e estável
  - Excelente para PostgreSQL
  - Fácil escalabilidade
  - Ótimo para produção

### Passo a Passo para Deploy (Railway - Recomendado)

1. Crie uma conta no [Railway](https://railway.app/)

2. Prepare seu projeto:
   ```bash
   # Adicione uma variável de porta no seu servidor Fastify
   const port = process.env.PORT || 3333
   ```

3. Configure as variáveis de ambiente:
   ```env
   DATABASE_URL=postgres://...
   PORT=3333
   ```

4. Conecte seu repositório GitHub ao Railway

5. Configure o PostgreSQL:
   - Adicione um novo PostgreSQL no Railway
   - Copie a URL de conexão
   - Adicione às variáveis de ambiente

6. Configure o build:
   ```json
   {
     "build": {
       "builder": "DOCKERFILE",
       "dockerfilePath": "./Dockerfile"
     }
   }
   ```

7. Deploy:
   - O Railway detectará automaticamente seu Dockerfile
   - O deploy será feito automaticamente a cada push

### Considerações para Produção

- **Segurança**:
  - Configure CORS apropriadamente
  - Use variáveis de ambiente
  - Implemente rate limiting

- **Performance**:
  - Configure pool de conexões
  - Implemente cache quando necessário
  - Monitore o uso de recursos

- **Manutenção**:
  - Configure logs adequados
  - Implemente health checks
  - Mantenha backups regulares

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuindo

Contribuições são sempre bem-vindas! Por favor, leia o [guia de contribuição](CONTRIBUTING.md) primeiro.

