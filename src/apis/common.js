import http from '@/utils/http'

export async function apiGetTopics() {
  return http.get('/topics')
}
