// old way

interface User1 {
  id: string;
  name: string;
}

type Users1 = { [key: string]: User1 };

const users1: Users1 = {
  abc123: { id: 'abc123', name: 'John Doe' },
  xyz789: { id: 'xyz789', name: 'Jane Doe' },
};

// new way of creating object using record

interface User2 {
  id: string;
  name: string;
}

type Users = Record<string, User2>;

const users: Users = {
  abc123: { id: 'abc123', name: 'John Doe' },
  xyz789: { id: 'xyz789', name: 'Jane Doe' },
};

console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }
