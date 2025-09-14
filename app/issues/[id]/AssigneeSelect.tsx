"use client";
import React, { useState } from "react";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { User } from "@prisma/client";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>("/api/users");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Select an assignee"></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users && users.length > 0 ? (
            users.map((user: User) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))
          ) : (
            <Select.Item value="no-users">No users found</Select.Item>
          )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
