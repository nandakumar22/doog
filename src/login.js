/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Grid,
  Col,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {validationService} from './validation/service';

const signIn = () => {
  Actions.dd();
};
const signUp = () => {
  Actions.up();
};
const fff = () => {
  Actions.frgt();
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passwordSignin: '',
      showUsernameErr: false,
      showPasswordErr: false,
      loading: false,
      inputs: {
        // email: {
        //     type: "email",
        //     value: "",
        //     errorLabel: ""
        // },
        passwordSignin: {
          type: 'passwordSignin',
          value: '',
          errorLabel: '',
        },
        phone: {
          type: 'phone',
          value: '',
          errorLabel: '',
        },
      },
    };
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  changeValue() {
    this.setState({showUsernameErr: false});
    this.setState({showPasswordErr: false});
  }

  renderError(id) {
    const {inputs} = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  render() {
    {
      /* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */
    }
    {
      /*     
                    <Image source={require('../images/dg.jpeg')}
                    style={{width:'100%', height: '100%',backgroundColor:"white", resizeMode: 'contain'}} /> */
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Text style={{alignContent:"center",textAlign:"center",fontWeight:'bold',fontSize:30}}>DOOG</Text> */}

          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('../images/dg.png')}
          />
          <Text style={styles.textDate}>V0.1</Text>

          <Text style={styles.text1}>Sign In</Text>

          <Content>
            <Form style={{paddingTop: 20}}>
              <Item stackedLabel last>
                <Label style={{fontSize: 14}}>Mobile Number</Label>
                <Input
                  placeholder="Enter your Mobilenumber"
                  maxLength={10}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  style={{opacity: 0.6, fontSize: 16, paddingBottom: 1}}
                  onChangeText={value => {
                    this.onInputChange({id: 'phone', value});
                  }}
                />
                {this.renderError('phone')}
                {this.state.showPhoneErr ? <phoneNumber /> : null}
              </Item>
              {/* <Item stackedLabel last>
                            <Label style={{ fontSize: 14 }}>Email</Label>
                            <Input placeholder="Enter your email" autoCapitalize='none' style={{ opacity: 0.6, fontSize: 16, paddingBottom: 1 }} onChangeText={value => {
                                this.onInputChange({ id: "email", value });
                            }} onChange={(event) => this.changeValue(event)} />
                            {this.renderError("email")}
                            {this.state.showUsernameErr ? <Username /> : null}
                        </Item> */}

              <Item stackedLabel last>
                <Label style={{fontSize: 14}}>Password</Label>
                <Input
                  placeholder="Enter your password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  style={{opacity: 0.6, fontSize: 16, paddingBottom: 1}}
                  onChangeText={value => {
                    this.onInputChange({id: 'passwordSignin', value});
                  }}
                />
                {this.renderError('passwordSignin')}
                {this.state.showPasswordErr ? <Password /> : null}
              </Item>

              {/* <Text style={styles.text4}>Forgot Password?</Text> */}
              <Button
                full
                rounded
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  marginTop: 15,
                  marginLeft: 25,
                  marginRight: 25,
                  backgroundColor: '#00b0e6',
                }}
                onPress={this.signIn.bind(this)}>
                <Text style={{color: 'white'}}>Sign In</Text>
              </Button>
              {/* <Text style={styles.text2}>or</Text> */}

              <Text style={styles.text5}>
                Don't have an account?{' '}
                <Text style={styles.text3} onPress={signUp}>
                  Sign Up
                </Text>
              </Text>
              <Text onPress={fff} style={styles.text3}>
                Forgot Pssword?
              </Text>
            </Form>
          </Content>
        </ScrollView>
      </View>
    );
  }
  signIn() {
    this.getFormValidation();
    this.setState({loading: true});
    if (
      this.state.inputs.phone.errorLabel === null &&
      this.state.inputs.passwordSignin.errorLabel === null
    ) {
      fetch('http://192.168.0.16:2112/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: '' + this.state.inputs.phone.value,
          password: '' + this.state.inputs.passwordSignin.value,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          //    let knk = responseJson.response;
          //  alert(knk);
          // alert(responseJson);
          if (responseJson.status == 200) {
            Actions.dd();
          } else {
            alert(responseJson.response);
          }
        })
        .catch(error => {
          alert('err');
          console.error(error);
        });

      // Firebase.auth().signInWithEmailAndPassword(this.state.inputs.email.value, this.state.inputs.passwordSignin.value)
      //     .then((res) => {
      //         this.setState({ showUsernameErr: false });
      //         this.setState({ showPasswordErr: false });
      //         //this.setState({ loading: false });
      //         //Actions.profile({ uid: res.user.uid })
      //         AsyncStorage.setItem('auth', res.user.uid);
      //         Firebase.firestore().collection('racerobins').doc("" + res.user.uid).collection('profile').doc("" + res.user.uid)
      //             .get().then((response) => {
      //                 console.log(response)
      //                 if (response.exists) {
      //                     this.setState({ loading: false });
      //                     Actions.tabs({ uid: res.user.uid })
      //                 } else {
      //                     this.setState({ loading: false });
      //                     Actions.profile({ uid: res.user.uid })
      //                 }
      //             }).catch((error) => {
      //                 this.setState({ loading: false });
      //                 console.log(error)
      //             })
      //     }).catch((error) => {
      //         if (error.code == "auth/wrong-password") {
      //             this.setState({ loading: false });
      //             this.setState({ showPasswordErr: true });
      //         } else if (error.code == "auth/user-not-found") {
      //             this.setState({ loading: false });
      //             this.setState({ showUsernameErr: true });
      //         }
      //     })
    } else {
      this.setState({showUsernameErr: false});
      this.setState({showPasswordErr: false});
      this.setState({loading: false});
    }
  }
}
export default Login;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    borderColor: 'red',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  logo: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 2,
    marginBottom: 2,
    alignSelf: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  text2: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 2,
    opacity: 0.6,
  },
  textDate: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
    marginTop: 3,
    opacity: 0.6,
    color: 'grey',
  },
  text3: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    color: '#00b0e6',
  },
  socialIcons: {
    width: 30,
    height: 30,
  },
  socialIconsFacebook: {
    width: 30,
    height: 30,
  },
  socialIconsGoogle: {
    width: 25,
    height: 25,
  },
  socialIconPhone: {
    width: 25,
    height: 25,
  },
  text4: {
    fontSize: 15,
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 5,
    color: 'grey',
  },
  gridStyles: {
    margin: 15,
    marginTop: 15,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  text5: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 13,
    marginBottom: 0.2,
  },
  error: {
    position: 'absolute',
    bottom: -14,
    marginLeft: 10,
    alignItems: 'center',
    color: 'red',
    fontSize: 12,
  },
});
