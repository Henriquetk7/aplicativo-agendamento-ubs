import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Agendamento() {
  const { id } = useLocalSearchParams();
  const [posto, setPosto] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [loadingTipos, setLoadingTipos] = useState(true);
  const [loadingHorarios, setLoadingHorarios] = useState(false);

  const router = useRouter();

  // Buscar nome do posto
  useEffect(() => {
    fetch(`https://backend-app-agendamento-1.onrender.com/detalhesPosto/${id}`)
      .then((res) => res.json())
      .then(setPosto)
      .catch((err) => console.error("Erro ao buscar posto:", err));
  }, [id]);

  // Buscar tipos de atendimento
  useEffect(() => {
    fetch(
      `https://backend-app-agendamento-1.onrender.com/tiposAtendimento/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTipos(data);
        setLoadingTipos(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar tipos:", err);
        setLoadingTipos(false);
      });
  }, [id]);

  // Buscar horários com fichas restantes
  useEffect(() => {
    if (tipoSelecionado) {
      setLoadingHorarios(true);
      setHorarioSelecionado(null);
      fetch(
        `https://backend-app-agendamento-1.onrender.com/horariosAgendamentoComFichas/${id}/${tipoSelecionado}`
      )
        .then((res) => res.json())
        .then((data) => {
          const comFichas = data.map((item) => ({
            ...item,
            fichas_restantes: item.quantidade_fichas - item.fichas_usadas,
          }));
          setHorarios(comFichas);
          setLoadingHorarios(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar horários com fichas:", err);
          setLoadingHorarios(false);
        });
    }
  }, [tipoSelecionado]);

  const handleContinuar = () => {
    if (!horarioSelecionado) return;

    router.push({
      pathname: "/posto/resumo",
      params: {
        id: id,
        nome_posto: posto?.nome,
        id_agendamento: horarioSelecionado.id_agendamento,
        descricao: tipos.find((t) => t.id_tipo_atendimento === tipoSelecionado)
          ?.descricao,
        data_hora: horarioSelecionado.data_hora_agendamento,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          style={styles.icon}
          source={require("../../assets/arrow-right.png")}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Faça seu agendamento.</Text>
      <Text style={styles.subText}>
        Qual tipo de atendimento está procurando?
      </Text>

      {loadingTipos ? (
        <ActivityIndicator size="large" color="#016DFF" />
      ) : (
        <FlatList
          data={tipos}
          keyExtractor={(item) => item.id_tipo_atendimento.toString()}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                tipoSelecionado === item.id_tipo_atendimento &&
                  styles.itemSelecionado,
              ]}
              onPress={() => setTipoSelecionado(item.id_tipo_atendimento)}
            >
              <Text style={styles.text}>{item.descricao}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {tipoSelecionado && (
        <>
          <Text style={styles.subText}>
            Qual dia e horário é melhor para você?
          </Text>
          {loadingHorarios ? (
            <ActivityIndicator size="large" color="#016DFF" />
          ) : (
            <FlatList
              data={horarios}
              keyExtractor={(item) => item.id_agendamento.toString()}
              renderItem={({ item }) => {
                const esgotado = item.fichas_restantes <= 0;
                return (
                  <TouchableOpacity
                    disabled={esgotado}
                    onPress={() => setHorarioSelecionado(item)}
                    style={[
                      styles.horario,
                      horarioSelecionado?.id_agendamento ===
                        item.id_agendamento && styles.horarioSelecionado,
                      esgotado && styles.horarioDesabilitado,
                    ]}
                  >
                    <Text style={styles.horarioText}>
                      {new Date(item.data_hora_agendamento).toLocaleString(
                        "pt-BR"
                      )}
                    </Text>
                    <Text style={styles.qtdFichas}>
                      {esgotado
                        ? "Fichas esgotadas"
                        : `Fichas disponíveis: ${item.fichas_restantes}`}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </>
      )}

      {horarioSelecionado && (
        <TouchableOpacity style={styles.btn} onPress={handleContinuar}>
          <Text style={styles.btnText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 64,
    paddingBottom: 48,
  },

  icon: {
    width: 40,
    height: 40,
    position: "relative",
    right: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
  },

  subText: {
    fontSize: 14,
    color: "#808080",
    marginBottom: 16,
  },
  item: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
  },
  itemSelecionado: {
    backgroundColor: "#CFE3FF",
    borderWidth: 2,
    borderColor: "#016DFF",
  },
  text: {
    color: "#000",
  },
  horario: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },

  horarioText: {
    fontWeight: "bold",
  },
  horarioSelecionado: {
    backgroundColor: "#CFE3FF",
    borderWidth: 2,
    borderColor: "#016DFF",
  },
  horarioDesabilitado: {
    backgroundColor: "#ddd",
    opacity: 0.6,
  },
  qtdFichas: {
    fontSize: 12,
    color: "#808080",
    marginTop: 4,
  },

  btn: {
    marginTop: 24,
    backgroundColor: "#016DFF",
    padding: 16,
    borderRadius: 32,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
