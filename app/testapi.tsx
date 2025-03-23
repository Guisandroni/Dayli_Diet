import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useDiets } from './hooks/useDiets'

const TestApi = () => {
  const { diets, loading, error, fetchDiets } = useDiets('66f06160f0323949d3f3d4d8')

  useEffect(() => {
    fetchDiets()
  }, [])

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.dietItem}>
      <View style={styles.dietHeader}>
        <Text style={styles.dietName}>{item.name}</Text>
        <View style={[
          styles.statusIndicator,
          { backgroundColor: item.inDiet==='SIM' ?  '#4CAF50' : '#F44336' }
        ]} />
      </View>
      <Text style={styles.dietInfo}>Hora: {item.hourCreated}</Text>
      <Text style={styles.dietInfo}>Data: {item.dateCreated}</Text>
    </View>
  )

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhuma dieta encontrada</Text>
    </View>
  )

  const ListHeaderComponent = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Teste de API</Text>
      {loading && (
        <Text style={styles.loadingText}>Carregando...</Text>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  )

  return (
    <FlatList
      data={diets}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
  },
  errorContainer: {
    marginTop: 10,
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
  },
  dietItem: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  dietHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  dietName: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  dietInfo: {
    color: '#666',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
})

export default TestApi