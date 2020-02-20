import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, Text, Button, Alert } from "react-native";

export default class ConsumoAguaDiario extends Component {

  constructor(props) {
    super(props);
    this.state = { consumido: 0, status: 'Ruim', pct: '0%' };

    this.addCopo = this.addCopo.bind(this);
    this.atualizar = this.atualizar.bind(this);
    this.zerarCopo = this.zerarCopo.bind(this);
  }

  atualizar() {
    let s = this.state;
    s.pct = Math.floor((s.consumido / 2000) * 100);

    if (s.pct >= 100) {
      s.status = "Ótimo!"
    } else if (s.pct >= 70 && s.pct < 100) {
      s.status = "Bom!"
    } else {
      s.status = "Ruim!"
    }

    if (s.consumido >= 4000) {
      Alert.alert("Quantidade de água diária excedida!");
      s.status = '--';
    }

    s.pct += "%";
    this.setState(s);
  }

  addCopo() {
    let s = this.state;
    s.consumido += 200;

    this.setState(s);

    this.atualizar();
  }

  zerarCopo() {
    let s = this.state;
    s.consumido = 0;
    s.pct = 0;

    s.pct += "%";
    this.setState(s);
  }

  

  render() {
    return (
      <View style={styles.body}>
        <ImageBackground source={require('./img/waterbg.png')} style={styles.bgimage}>
          <View>

            <View style={styles.infoArea}>

              <View style={styles.areaInterna}>
                <Text style={styles.areaTitulo}>Objetivo</Text>
                <Text style={styles.areaInfo}>2000ml</Text>
              </View>
              <View style={styles.areaInterna}>
                <Text style={styles.areaTitulo}>Consumido</Text>
                <Text style={styles.areaInfo}>{this.state.consumido}ml</Text>
              </View>
              <View style={styles.areaInterna}>
                <Text style={styles.areaTitulo}>Status</Text>
                <Text style={styles.areaInfo}>{this.state.status}</Text>
              </View>

            </View>

            <View style={styles.pctArea}>
              <Text style={styles.pctTexto}>{this.state.pct}</Text>
            </View>

            <View style={styles.btnCalculo}>
              <Button title="Consumir" onPress={this.addCopo} />
            </View>
            <View style={styles.btnCalculo}>
              <Button title="Limpar" onPress={this.zerarCopo} />
            </View>
            
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20
  },
  bgimage: {
    flex: 1,
    width: null
  },
  infoArea: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70
  },
  areaInterna: {
    flex: 1,
    alignItems: 'center'
  },
  areaTitulo: {
    color: '#45B2FC',
    fontSize: 20
  },
  areaInfo: {
    color: '#2B4274',
    fontSize: 25,
    fontWeight: 'bold'
  },
  pctArea: {
    marginTop: 210,
    alignItems: 'center'

  },
  pctTexto: {
    fontSize: 60,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  btnCalculo: {
    marginTop: 30,
    alignItems: 'center'
  }
});