import Vue from "vue"

Vue.filter("toCurrency", function (value) {
  if (typeof value !== "number") {
    return value
  }
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  })
  return formatter.format(value)
})
