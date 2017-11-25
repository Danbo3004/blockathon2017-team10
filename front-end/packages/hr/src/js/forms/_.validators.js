import transport from '../transports/RestTransport';

export function checkSubDomain ({field, form}) {
  let idValue = null;
  if (form.getEntity()) {
    idValue = form.getEntity().value;
  }
  const msg = `Subdomain is invalid`;
  return transport.fetch(`/companies/validateSubDomain?sub_domain=${field.value}&id=${idValue}`)
    .then (response => {
      return [ true, msg ]
    })
    .catch(error => [false, msg])
};

export function checkCreditCard ({ field }) {
  // Master | Amex | Visa
  const regex = [ '5[1-5][0-9]{14}', '3[47][0-9]{13}', '4[0-9]{15}' ];
  let result = false;
  let patt = null;
  regex.forEach (function (value) {
    patt = new RegExp (value);
    if (patt.test (field.value) === true) {
      result = true;
    }
  });
  const msg = `Just allow Master | Visa | Amex`;
  return [ result, msg ];
}
