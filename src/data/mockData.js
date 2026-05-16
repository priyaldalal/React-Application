const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Legal', 'Product', 'Design', 'Engineering'];
const designations = ['Manager', 'Developer', 'Designer', 'Analyst', 'Lead', 'Senior', 'Junior', 'Intern', 'Coordinator', 'Specialist'];
const statuses = ['Active', 'Inactive', 'On Leave', 'Terminated'];
const genders = ['Male', 'Female', 'Non-binary'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];

export const mockUsers = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  const firstName = ['John', 'Jane', 'Michael', 'Emily', 'Chris', 'Sarah', 'David', 'Laura', 'Robert', 'Jessica'][index % 10];
  const lastName = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez'][index % 10];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@example.com`;
  const phone = `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const gender = genders[Math.floor(Math.random() * genders.length)];
  const age = Math.floor(Math.random() * 40) + 20;
  const address = `${Math.floor(100 + Math.random() * 900)} Main St`;
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[cities.indexOf(city)];
  const country = 'USA';
  const zipCode = Math.floor(10000 + Math.random() * 90000).toString();
  const company = ['TechCorp', 'InnoSoft', 'DataFlow', 'GlobalSys', 'WebLogic', 'CloudNine', 'SoftServe', 'NextGen', 'FastTrack', 'SolidBase'][Math.floor(Math.random() * 10)];
  const department = departments[Math.floor(Math.random() * departments.length)];
  const designation = designations[Math.floor(Math.random() * designations.length)];
  const salary = Math.floor(50000 + Math.random() * 100000);
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const joiningDate = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0];
  const experience = Math.floor(Math.random() * 15) + 1;

  return {
    id,
    firstName,
    lastName,
    email,
    phone,
    gender,
    age,
    address,
    city,
    state,
    country,
    zipCode,
    company,
    department,
    designation,
    salary,
    status,
    joiningDate,
    experience
  };
});
