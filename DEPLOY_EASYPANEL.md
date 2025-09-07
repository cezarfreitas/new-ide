# Deploy no EasyPanel - IDE Negócios Digitais

Este guia explica como fazer o deploy do site no EasyPanel usando Docker.

## 🐳 **Configuração Docker**

### **Arquivos Criados:**
- ✅ **Dockerfile** - Imagem otimizada para produção
- ✅ **docker-compose.yml** - Orquestração de containers
- ✅ **.dockerignore** - Otimização do build
- ✅ **API Health Check** - Monitoramento de saúde

## 🚀 **Deploy no EasyPanel**

### **1. Preparação do Repositório:**
```bash
# Clone o repositório
git clone https://github.com/cezarfreitas/new-ide.git
cd new-ide

# Verifique se todos os arquivos estão presentes
ls -la
```

### **2. Configuração no EasyPanel:**

#### **A. Criar Novo Projeto:**
1. Acesse o [EasyPanel](https://easypanel.io)
2. Clique em "New Project"
3. Selecione "Docker Compose"
4. Nome do projeto: `ide-negocios-digitais`

#### **B. Configurar Repositório:**
1. **Repository URL**: `https://github.com/cezarfreitas/new-ide.git`
2. **Branch**: `master`
3. **Docker Compose File**: `docker-compose.yml`

#### **C. Configurar Variáveis de Ambiente:**
```env
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-G1YXN755WQ
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456

# Webhook
NEXT_PUBLIC_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url

# Verificações
NEXT_PUBLIC_GOOGLE_VERIFICATION=G-G1YXN755WQ
NEXT_PUBLIC_FACEBOOK_VERIFICATION=your-facebook-verification-code
NEXT_PUBLIC_PINTEREST_VERIFICATION=your-pinterest-verification-code

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_COMPANY_NAME=IDE Negócios Digitais
NEXT_PUBLIC_CONTACT_EMAIL=contato@idenegociosdigitais.com.br
NEXT_PUBLIC_CONTACT_PHONE=+55-11-99999-9999

# Redes Sociais
NEXT_PUBLIC_TWITTER_HANDLE=@idenegociosdigitais
NEXT_PUBLIC_INSTAGRAM_HANDLE=@idenegociosdigitais
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/ide-negocios-digitais
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/idenegociosdigitais
```

#### **D. Configurar Domínio:**
1. **Custom Domain**: `your-domain.com`
2. **SSL Certificate**: Automático (Let's Encrypt)
3. **Redirect HTTP to HTTPS**: Ativado

### **3. Deploy:**
1. Clique em "Deploy"
2. Aguarde o build (5-10 minutos)
3. Verifique os logs para erros
4. Teste o site no domínio configurado

## 🔧 **Configurações Avançadas**

### **Health Check:**
- **Endpoint**: `https://your-domain.com/api/health`
- **Interval**: 30 segundos
- **Timeout**: 10 segundos
- **Retries**: 3 tentativas

### **Recursos Recomendados:**
- **CPU**: 1 vCPU
- **RAM**: 1GB
- **Storage**: 10GB
- **Network**: 1Gbps

### **Monitoramento:**
- **Uptime**: Monitorado via health check
- **Logs**: Acessíveis via EasyPanel dashboard
- **Métricas**: CPU, RAM, Network

## 📊 **Otimizações Implementadas**

### **Dockerfile:**
- ✅ **Multi-stage build** para otimizar tamanho
- ✅ **Node.js 18 Alpine** para menor footprint
- ✅ **Non-root user** para segurança
- ✅ **Standalone output** para produção
- ✅ **Output file tracing** para otimização

### **Performance:**
- ✅ **Compressão gzip** ativada
- ✅ **Cache headers** configurados
- ✅ **Image optimization** habilitada
- ✅ **Bundle optimization** com tree shaking

### **Segurança:**
- ✅ **Non-root user** no container
- ✅ **Security headers** configurados
- ✅ **Dependencies** atualizadas
- ✅ **Environment variables** seguras

## 🛠️ **Comandos Úteis**

### **Build Local:**
```bash
# Build da imagem
docker build -t ide-negocios-digitais .

# Executar localmente
docker run -p 3000:3000 ide-negocios-digitais
```

### **Docker Compose:**
```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### **Debug:**
```bash
# Entrar no container
docker exec -it ide-negocios-digitais sh

# Ver logs do container
docker logs ide-negocios-digitais

# Verificar health check
curl http://localhost:3000/api/health
```

## 📋 **Checklist de Deploy**

### **Antes do Deploy:**
- [ ] Repositório atualizado no GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio configurado
- [ ] SSL certificate configurado
- [ ] Health check funcionando

### **Após o Deploy:**
- [ ] Site carregando corretamente
- [ ] Formulário de contato funcionando
- [ ] Analytics funcionando
- [ ] Meta Pixel funcionando
- [ ] Webhook recebendo dados
- [ ] SEO tags funcionando
- [ ] Performance otimizada

## 🆘 **Troubleshooting**

### **Build Falha:**
- Verifique se todas as dependências estão no package.json
- Confirme se o Dockerfile está correto
- Verifique os logs de build no EasyPanel

### **Site Não Carrega:**
- Verifique se a porta 3000 está exposta
- Confirme se as variáveis de ambiente estão corretas
- Teste o health check: `/api/health`

### **Performance Lenta:**
- Verifique os recursos alocados
- Confirme se o cache está funcionando
- Otimize as imagens

### **Analytics Não Funciona:**
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o site está em produção
- Teste com o Google Analytics Debugger

## 🔄 **Atualizações**

### **Deploy de Atualizações:**
1. Faça push das mudanças para o GitHub
2. No EasyPanel, clique em "Redeploy"
3. Aguarde o novo build
4. Verifique se tudo está funcionando

### **Rollback:**
1. No EasyPanel, vá para "Deployments"
2. Selecione a versão anterior
3. Clique em "Rollback"
4. Confirme a operação

## 📈 **Monitoramento Contínuo**

### **Métricas Importantes:**
- **Uptime**: Deve ser > 99.9%
- **Response Time**: < 2 segundos
- **Error Rate**: < 1%
- **CPU Usage**: < 80%
- **Memory Usage**: < 80%

### **Alertas Configurados:**
- Site fora do ar
- Alta utilização de recursos
- Erros de aplicação
- Falhas de health check

Com essa configuração, o site estará rodando de forma otimizada e confiável no EasyPanel! 🚀
