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

    getAllContentForIds(ids) {
      var string = "";

      for (let index = 0; index < ids.length; index++) {
        const element = ids[index].sys.id;
        if (index != ids.length - 1) {
          string += element + ",";
        } else {
          string += element;
        }
      }
      this.getContentfulEntries({
        "sys.id[in]": string,
      }).then((response) => {
        return response;
      });
    },
  },
};
