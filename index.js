import mongoose from "mongoose";
// create a function to connect to mongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ajabafrancis:Rs3M4opRwupJYx1q@cluster0.czdnofv.mongodb.net/mongoose-checkpoint?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`mongoDB Connected successfully`);
    console.log("creating user document");
    queryChain();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Task 1: A person prototype
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favoriteFoods: [String],
});

// Task 2: Create a person model
const Person = mongoose.model("Person", personSchema);

//  Task 2b:Create a person document
async function createPerson() {
  try {
    const person = new Person({
      name: "francis",
      age: 47,
      favoriteFoods: ["Pizza", "Hamburger"],
    });
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
}

// Task 3 : Create many people with 'Model.create()'
const createManyPeople = async () => {
  let arrayOfPeople = [
    { name: "Francis", age: 107, favoriteFoods: ["Noodle", "Rice", "Eba"] },
    { name: "Aisha", age: 27, favoriteFoods: ["Pepper soup", "Meat", "Pasta"] },
    {
      name: "Fatima",
      age: 17,
      favoriteFoods: ["Pizza soup", "Hamburger", "Eba"],
    },
  ];
  try {
    const result = await Person.create(arrayOfPeople);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// task 4: use 'Model.find()' to search your Database
const findPeopleByName = async () => {
  try {
    const person = await Person.find({ name: "francis" });
    console.log(Person);
  } catch (error) {
    console.log(error);
  }
};

// Task 5: Use 'model.findOne()' to return madocument from your database
const findOnePerson = async () => {
  try {
    const person = await person.findOne({ favoriteFoods: "Eba" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// task 6: Use `model findById` to serch your database by_Id and return a single document
const findPersonById = async () => {
  try {
    const person = await Person.findById("669155ef706ba29d8bfaa681");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// task 7: perform Clasic Updates by Running Find, Edit,  then Save
const findEditThenSave = async () => {
  try {
    const person = await person.findById("669155ef706ba29d8bfaa681");
    person.favoriteFoods.push("Egusi and panded yam");
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// task 8: Perform new Update on a Document Using `model.findOneAndUpdate()`
const findOneAndUpdate = async () => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: "francis" },
      { age: 100 },
      { new: true }
    );
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// task 9: Delete one Document Using `model findByIdAndRemove`
const removePersonById = async () => {
  try {
    const person = await Person.findByIdAndDelete("669155ef706ba29d8bfaa681");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// task 10: MongoDb and Mongoose - delete Many Document with `model.remove()`
const removeManyPeople = async () => {
  try {
    const person = await person.deleteMany({ name: "Fatima" });
  } catch (error) {
    console.log(error);
  }
};

// task 11: Chain search Query Helpers to Narror Search  Results
const queryChain = async () => {
  try {
    const person = await Person.find({ favoriteFoods: "Pizza" })
      .sort({ name: "asc" })
      .limit(2)
      .select("-age")
      .exec();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};
