import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Bubble from './components/Bubble';
import { StyleSheet, ScrollView, View, SafeAreaView, Text } from 'react-native';
import * as Font from 'expo-font';


const SeparatorSame = () => <View style={styles.separatorSame} />;
const SeparatorNotsame = () => <View style={styles.separatorNotsame} />;
const SeparatorNotsamenot = () => <View style={styles.separatorNotsamenot} />;

export default function App() {

  const [sessionId, setSessionId] = useState("");
  const [bubbles, setBubbles] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchQAs = async (_p_sessionId, answer, userBubbleMessage) => {
    const payloads = {
      'responseId': answer.toString()
    }
    try {
      setLoading(true)
      const response = await fetch("http://192.168.115.145:8888/v1/responses", {
        method: 'POST',
        body: JSON.stringify(payloads),
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${sessionId}`,
        },
      });
      const qas = await response.json();

      if (qas["message"] !== undefined) {

        setBubbles(
          [...bubbles,
          [{ coach: qas["message"] }],
          ]
        );
        setButtons({});
      }
      else {
        if (qas["response"] !== undefined) {
          setBubbles(
            [...bubbles,
            [{ user: userBubbleMessage }],
            [{ coach: qas["response"] }],
            ]
          );
        }
        if (qas["question"] !== undefined) {

          setBubbles(
            [...bubbles,
            [{ user: userBubbleMessage }],
            [{ coach: qas["question"] }],
            ]
          );
        }
        if (qas["answers"] !== undefined) {
          setButtons(qas["answers"]);
        }
      }
    }
    catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    (
      async function () {
        try {
          setLoading(true)
          await Font.loadAsync({
            'Gilroy-Medium': require('./assets/fonts/FontsFree-Net-Gilroy2.ttf')
          })

          const response = await fetch("http://192.168.115.145:8888/v1/auth", {
            method: 'POST',
            body: {},
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*'
            },
          });

          const auth = await response.json();
          setSessionId(auth.sessionId);
          setBubbles(
            [...bubbles,
            [{ coach: auth.question.greeting[0] }],
            [{ coach: auth.question.question }]
            ]
          );

          // setBubbles(auth.question);
          setButtons(auth.question.answers);
        }
        catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }
    )()
  }, []);


  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  }

  return (
    <>
      {bubbles !== undefined || bubbles.length > 0 ?
        <>
          <SafeAreaView style={styles.container}>
            <ScrollView
              style={styles.bubblePanel}
            >
              {
                bubbles.map((item, index) => {

                  return (
                    <View key={index}>
                      {Object.keys(item[0])[0] === 'coach' ? <SeparatorSame /> : <SeparatorNotsame />}
                      < Bubble
                        title={Object.values(item[0])[0]}
                        // title="3This layout strategy lets the title define the width of the button."
                        type={Object.keys(item[0])[0]}
                      />
                      {Object.keys(item[0])[0] === 'user' ? <SeparatorNotsamenot /> : null}
                    </View>
                  )

                })
              }
            </ScrollView>
            <View style={styles.fixToText}>
              {
                Object.entries(buttons).map((item) => {
                  return (
                    <Button
                      key={generateKey(item[0])}
                      style={styles.button}
                      title={item[1].label}
                      onPress={() => { fetchQAs(sessionId, item[0], item[1].label) }}
                    />
                  )
                })
              }
            </View>
          </SafeAreaView>
        </>
        :
        <Text style={styles.loading}>
          loading....
        </Text>
      }

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 12,
    backgroundColor: '#E5E5E5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },

  bubblePanel: {
    flexGrow: 1,
    flexDirection: 'column'
  },
  button: {
    backgroundColor: '#6D31FF',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#4919BD',
    borderRadius: 50,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  separatorSame: {
    height: 4
  },
  separatorNotsame: {
    height: 12
  },
  separatorNotsamenot: {
    height: 8
  },
});
