# API de finalização do pedido

O frontend chama `POST /api/v1/pedidos` usando `API_URL` (padrão: `http://localhost:3000/api/v1`). O token de sessão é enviado pelo servidor no header `Authorization: Bearer <token>`.

## Corpo da requisição

```json
{
  "pedido": {
    "nome_destinatario": "Maria Silva",
    "telefone_destinatario": "11999999999",
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "numero": "10",
    "complemento": "Apto 2",
    "bairro": "Sé",
    "cidade": "São Paulo",
    "itens": [
      { "produto_id": 1, "quantidade": 2 }
    ]
  }
}
```

Telefone e complemento são opcionais. Os campos seguem o modelo Pedido atual, que não possui UF.

## Resposta de sucesso: HTTP 201

Retornar o objeto diretamente, sem envelope `pedido`:

```json
{
  "id": 123,
  "status": "aguardando_pagamento",
  "total_centavos": 5990
}
```

Campos adicionais são permitidos. O frontend mostra o número, status e total retornados e só então limpa o carrinho. A tela não processa pagamentos.

## Erros

HTTP 401 para sessão inválida, 422 para endereço/itens/estoque inválidos, com `{"erro":"mensagem"}` ou `{"erros":["mensagem"]}`. O carrinho é mantido em caso de falha.

## Responsabilidades do backend

- Autenticar e associar o pedido ao usuário do token.
- Buscar os produtos e validar quantidades, existência e estoque.
- Calcular preços e totais no servidor; o frontend envia somente IDs e quantidades.
- Criar pedido e itens em uma transação, com os snapshots de nome e preço exigidos por ItemPedido.
- Aplicar a política de reserva/baixa de estoque com controle de concorrência.
- Definir frete e desconto conforme a regra comercial. A tela exibe apenas o subtotal antes da criação; caso haja cobrança adicional que exija aceite, implementar uma cotação antes da confirmação.

A rota e o controller ainda precisam ser implementados no backend. Após isso, testar criação autenticada, estoque insuficiente, sessão expirada e retorno de erros. Evitar repetir o envio após timeout sem conferir se o pedido já foi criado; idempotência no backend é recomendada para suportar retentativas.
