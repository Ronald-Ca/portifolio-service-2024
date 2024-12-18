
export type AboutCreateInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  person: string
  education: string
  address: string
  image?: string | null
}

export type AboutUpdateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  person?: string
  education?: string
  address?: string
  image?: string | null
}