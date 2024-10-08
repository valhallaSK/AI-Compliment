import { Image, StyleSheet, Platform, View, TextInput, Button, Text } from 'react-native';

import { Screen } from 'react-native-screens';
import { useState } from 'react';
import { AzureOpenAI } from "openai";


export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState('');

  const endpoint = process.env.END_POINT;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiVersion = "2023-03-15-preview";
  const deployment = "gpt-4o";

  const [isLoading, setIsLoading] = useState(false)

  //OPEN AI
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      setIsLoading(false)
      if (response.ok) {
        setResult(data.message);
      } else {
        console.error('Error:', data.error);
        setResult('Error occurred: ' + data.error);
      }
    } catch (error) {
      console.error('Request failed:', error);
      setResult('Request failed: ' + error);
      setIsLoading(false)
    }
  };

  // const handleSubmit = async () => {
  //   const endpointURL = `https://api.twitter.com/2/users/by?usernames=${username}`
  //   const params = new URLSearchParams({
  //     "user.fields": "created_at,description", // 需要额外获取的字段
  //     "expansions": "pinned_tweet_id" // 获取置顶推文的ID
  //   });
  //   try {
  //     // 发送 HTTP GET 请求到 Twitter API
  //     const response = await fetch(`${endpointURL}&${params.toString()}`, {
  //       method: 'GET',
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //         "User-Agent": "v2UserLookupJS"
  //       }
  //     });

  //     // 检查响应是否成功
  //     if (!response.ok) {
  //       throw new Error(`Twitter API request failed: ${response.status} ${response.statusText}`);
  //     }

  //     // 解析响应体为 JSON
  //     const data: ApiResponse = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching data from Twitter API:', error);
  //     throw error;
  //   }
  // }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="输入信息"
            value={username}
            onChangeText={setUsername}
          />
          <Button title="提交" onPress={handleSubmit} disabled={isLoading}/>
        </View>
        <View style={styles.resultContainer}>
          <Text>{result}</Text>
        </View>
      </View>
    </Screen>


  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
    minHeight: '100vh',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  input: {
    flex: 1,
    padding: 8,
    border: 'none',
    outline: 'none',
    fontSize: 16,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#0084ff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginLeft: 8,
  },
  resultContainer: {
    marginTop: 16,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 500,
  },
});
