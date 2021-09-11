const contenful = require("contentful");
const client = contenful.createClient({
  space: "r1wfevxudzi5",
  accessToken: "Mgp0hGKiO1LeLM3Z0uAlSeu-nVKR4aQpsno_-vNCKwc",
});

export default {
  methods: {
    getContentfulEntries(params) {
      return client.getEntries(params);
    },

    getContentfulEntry(id) {
      return client.getEntry(id);
    },
  },
};
