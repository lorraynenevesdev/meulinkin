const pagarme = require('pagarme')
const API_KEY = 'ak_live_y6JYUJlnJAQt7uq8oWjJotoCsS7VDW';
const ID_PLANO_PREMIUM = 1046349;

class PagamentoRecorrencia {

    constructor() {
        
    }

    obtemIdPermanenteLancamento(data) {
        pagarme.client.connect({ api_key: API_KEY })
        .then(client => client.cards.create({
            card_number: data.card_number,
            card_holder_name: data.card_holder_name,
            card_expiration_date: data.card_expiration_date,
            card_cvv: data.card_cvv,
        })
        )
        .then(card => console.log('id_cartao: ' + card.id));
    }

    obtemIdTemporarioLancamento(data) {
        pagarme.client.connect({ encryption_key: API_KEY })
        .then(client => {
            return client.security.encrypt({
            card_number: data.card_number,
            card_holder_name: data.card_holder_name,
            card_expiration_date: data.card_expiration_date,
            card_cvv: data.card_cvv,
            });
        })
        .then(card_hash => console.log('id_cartao: ' + card_hash))
    }

    criarAssinatura(dataAssinatura) {
        pagarme.client.connect({ api_key: API_KEY })
        .then(client => client.subscriptions.create({
            plan_id: dataAssinatura.plan_id,
            card_number: dataAssinatura.card_number,
            card_holder_name: dataAssinatura.card_holder_name,
            card_expiration_date: dataAssinatura.card_expiration_date,
            card_cvv: dataAssinatura.card_cvv,
            customer: {
                email: dataAssinatura.customer.email,
                document_number: dataAssinatura.customer.document_number
            }
            }))
        .then(subscription => console.log(subscription));
        /*
        pagarme.client.connect({ api_key: API_KEY })
        .then(client => client.subscriptions.create({
            plan_id: dataAssinatura.plan_id,
            card_id: dataAssinatura.card_id,
            payment_method: dataAssinatura.payment_method,
            customer: {
            email: dataAssinatura.customer.email,
            name: dataAssinatura.customer.name,
            document_number: dataAssinatura.customer.document_number,
            address: {
                zipcode: dataAssinatura.customer.address.zipcode,
                neighborhood: dataAssinatura.customer.address.neighborhood,
                street: dataAssinatura.customer.address.street,
                street_number: dataAssinatura.customer.address.street_number,
            },
            phone: {
                number: dataAssinatura.customer.phone.number,
                ddd: dataAssinatura.customer.phone.ddd
                }
            }
            }));
            */
        // then( assinatura => console.log('dados assinatura: ', assinatura));
    }

    obtemSaldo() {
        pagarme.client.connect({ api_key: API_KEY })
        .then(client => client.balance.primary())
        .then(balance => console.log(balance))
    }
}

module.exports = PagamentoRecorrencia;
