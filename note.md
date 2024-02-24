To interact with the endpoints you've defined in your `ChatController` using Axios from the client-side, you would structure your requests like this:

### 1. Create Chat

**Endpoint:** POST `/chat/create`  
**Body:** `{ "userId": "theUserIdOfTheUserToChatWith" }`  
**Axios Example:**

```javascript
axios
  .post(
    "http://localhost:3000/chat/create",
    {
      userId: "theUserIdOfTheUserToChatWith",
    },
    {
      withCredentials: true, // to include cookies in the request
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### 2. Get All Chats for Current User

**Endpoint:** GET `/chat/all`  
**Axios Example:**

```javascript
axios
  .get("http://localhost:3000/chat/all", {
    withCredentials: true, // to include cookies in the request
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### 3. Get Chat Messages

**Endpoint:** GET `/chat/:id` where `:id` is the chat ID.  
**Axios Example:**

```javascript
axios
  .get(`http://localhost:3000/chat/${chatId}`, {
    withCredentials: true, // to include cookies in the request
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### 4. Send Message

**Endpoint:** POST `/chat/message`  
**Body:** `{ "content": "Your message here", "chatId": "TheChatId", "channelId": "TheChannelId" }`  
**Note:** Either `chatId` or `channelId` should be provided based on where you are sending the message.  
**Axios Example:**

```javascript
axios
  .post(
    "http://localhost:3000/chat/message",
    {
      content: "Your message here",
      chatId: "TheChatId",
      // channelId: 'TheChannelId', // Uncomment if it's for a channel
    },
    {
      withCredentials: true, // to include cookies in the request
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### 5. Create Channel

**Endpoint:** POST `/chat/channel/create`  
**Body:** `{ "name": "Channel Name", "type": "PUBLIC or PROTECTED", "password": "passwordIfProtected" }`  
**Axios Example:**

```javascript
axios
  .post(
    "http://localhost:3000/chat/channel/create",
    {
      name: "Channel Name",
      type: "PUBLIC", // or 'PROTECTED'
      password: "passwordIfProtected", // Include if type is PROTECTED
    },
    {
      withCredentials: true, // to include cookies in the request
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

Make sure to replace placeholder values like `theUserIdOfTheUserToChatWith`, `chatId`, `TheChatId`, `TheChannelId`, and `Channel Name` with actual values as per your application's context. Also, adjust the `localhost:3000` part if your server is running on a different host or port.

For the newly added methods in your `ChatController`, you can interact with them using Axios from the client-side as follows:

### Get Channels

**Endpoint:** GET `/chat/channel`  
**Axios Example:**

```javascript
axios
  .get("http://localhost:3000/chat/channel", {
    withCredentials: true,
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Update Channel

**Endpoint:** PATCH `/chat/channel/:id`  
**Body:** `{ "name": "New Channel Name", "type": "PUBLIC or PROTECTED", "password": "newPasswordIfProtected" }`  
**Axios Example:**

```javascript
axios
  .patch(
    `http://localhost:3000/chat/channel/${channelId}`,
    {
      name: "New Channel Name",
      type: "PUBLIC", // or 'PROTECTED'
      password: "newPasswordIfProtected", // Include if type is PROTECTED
    },
    {
      withCredentials: true,
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Delete Channel

**Endpoint:** DELETE `/chat/channel/:id`  
**Axios Example:**

```javascript
axios
  .delete(`http://localhost:3000/chat/channel/${channelId}`, {
    withCredentials: true,
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Join Channel

**Endpoint:** POST `/chat/channel/:id/join`  
**Body:** `{ "password": "passwordForProtectedChannel" }` (Password is only needed for protected channels)  
**Axios Example:**

```javascript
axios
  .post(
    `http://localhost:3000/chat/channel/${channelId}/join`,
    {
      password: "passwordForProtectedChannel", // Include if the channel is protected
    },
    {
      withCredentials: true,
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

Ensure to replace placeholder values like `channelId`, `New Channel Name`, and `passwordForProtectedChannel` with actual values relevant to your application. Adjust the `localhost:3000` part if your server is running on a different host or port.
For the newly added methods for leaving a channel, adding an admin, and removing an admin in your chat application, you can create Axios requests like this:

### Leave Channel

**Endpoint:** POST `/chat/channel/:id/leave`  
**Axios Example:**

```javascript
axios
  .post(
    `http://localhost:3000/chat/channel/${channelId}/leave`,
    {},
    {
      withCredentials: true,
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Add Admin to Channel

**Endpoint:** POST `/chat/channel/:id/admin`  
**Body:** `{ "userId": "targetUserId" }`  
**Axios Example:**

```javascript
axios
  .post(
    `http://localhost:3000/chat/channel/${channelId}/admin`,
    {
      userId: "targetUserId",
    },
    {
      withCredentials: true,
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Remove Admin from Channel

**Endpoint:** DELETE `/chat/channel/:id/admin`  
**Body:** `{ "userId": "targetAdminId" }`  
**Axios Example:**

```javascript
axios
  .delete(`http://localhost:3000/chat/channel/${channelId}/admin`, {
    data: { userId: "targetAdminId" }, // Axios DELETE with body requires using `data` field
    withCredentials: true,
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

Ensure to replace placeholder values such as `localhost:3000`, `channelId`, `targetUserId`, and `targetAdminId` with the actual values that pertain to your application. The inclusion of `withCredentials: true` is essential for ensuring that cookies, representing session data, are sent with requests for authentication purposes. If your application's server is hosted at a different address, make sure to update the URLs accordingly.

For these newly added methods to mute, ban, and kick members from a channel in your chat application, Axios requests can be structured as follows:

### Mute Member

**Endpoint:** POST `/chat/channel/:id/mute`  
**Body:** `{ "userId": "targetUserId", "expiresAt": "datetimeString" }`  
**Axios Example:**

```javascript
axios
  .post(
    `http://localhost:3000/chat/channel/${channelId}/mute`,
    {
      userId: "targetUserId",
      expiresAt: "2024-01-01T00:00:00Z",
    },
    {
      withCredentials: true,
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Ban Member

**Endpoint:** POST `/chat/channel/:id/ban`  
**Body:** `{ "userId": "targetUserId" }`  
**Axios Example:**

```javascript
axios
  .post(
    `http://localhost:3000/chat/channel/${channelId}/ban`,
    {
      userId: "targetUserId",
    },
    {
      withCredentials: true,
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Kick Member

**Endpoint:** POST `/chat/channel/:id/kick`  
**Body:** `{ "userId": "targetUserId" }`  
**Axios Example:**

```javascript
axios
  .post(
    `http://localhost:3000/chat/channel/${channelId}/kick`,
    {
      userId: "targetUserId",
    },
    {
      withCredentials: true,
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

In these examples, make sure to replace placeholder values like `localhost:3000`, `channelId`, `targetUserId`, and `datetimeString` (for mute expiration) with actual values relevant to your application. The `withCredentials: true` is important for session handling, assuming your setup involves cookies or similar mechanisms for user sessions. If your application is hosted elsewhere or requires specific headers for authentication (like a Bearer token), adjust the request accordingly.

### Get Channel Members

This example demonstrates how to get members of a specific channel.

```javascript
async function getChannelMembers(channelId) {
  try {
    const response = await apiClient.get(`chat/channel/${channelId}/members`);
    console.log("Channel Members:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching channel members:", error.response.data);
  }
}
```

### Get Channel Messages

This example shows how to fetch messages from a specific channel.

```javascript
async function getChannelMessages(channelId) {
  try {
    const response = await apiClient.get(`chat/channel/${channelId}/messages`);
    console.log("Channel Messages:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching channel messages:", error.response.data);
  }
}
```

### Add User to Channel

The following example adds a user to a specific channel. You need to pass the `userId` of the user you want to add.

```javascript
async function addUserToChannel(channelId, userId) {
  try {
    const response = await apiClient.post(`chat/channel/${channelId}/add`, {
      userId,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error adding user to channel:", error.response.data);
  }
}
```

### Get All Channels

This example fetches all channels that are either `PROTECTED` or `PUBLIC`.

```javascript
async function getAllChannels() {
  try {
    const response = await apiClient.get("chat/channel/all");
    console.log("Channels:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching channels:", error.response.data);
  }
}
```

### Search Channels

The following example searches through channels based on a keyword.

```javascript
async function searchChannels(keyword) {
  try {
    const response = await apiClient.get("chat/channel/search", {
      params: { keyword },
    });
    console.log("Search Results:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching channels:", error.response.data);
  }
}
```

Remember to replace `http://localhost:3000/` with your actual API base URL. Also, ensure proper error handling and security measures, such as authentication and authorization, are in place for these operations.
