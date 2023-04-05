const contacts = require("./contacts.js");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// const actionIndex = process.argv.indexOf("--action");
// console.log(process.argv);

// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   const id = process.argv[actionIndex + 2];
//   const name = process.argv[actionIndex + 3];
//   const email = process.argv[actionIndex + 4];
//   const phone = process.argv[actionIndex + 5];

//   invokeAction({ action, id, name, email, phone });
// }
