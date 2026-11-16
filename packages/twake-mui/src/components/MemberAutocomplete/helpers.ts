import { Member } from '../MemberRow/types'

export type GetMembersFromText = (text: string) => Member[]

const EMAIL_LIKE = /\S+@\S+/

const MAX_SUGGESTIONS = 20

export const isEmailLike = (text: string): boolean => EMAIL_LIKE.test(text)

const normalizeEmail = (email: string): string => email.trim().toLowerCase()

/** Whether two members are the same person: same id, or same email whatever its case */
export const isSameMember = (member: Member, other: Member): boolean =>
  member.id === other.id ||
  (Boolean(member.email) &&
    Boolean(other.email) &&
    normalizeEmail(member.email ?? '') === normalizeEmail(other.email ?? ''))

export const removeDuplicateMembers = (members: Member[]): Member[] =>
  members.filter(
    (member, index) =>
      members.findIndex(other => isSameMember(member, other)) === index
  )

export const getUnpickedMembers = (
  members: Member[],
  pickedMembers: Member[]
): Member[] =>
  members.filter(
    member => !pickedMembers.some(picked => isSameMember(member, picked))
  )

/**
 * Replaces each member by the known one for the same person, so that a typed email
 * gives the suggested contact rather than a second member
 * @param members - Members made from a text
 * @param knownMembers - Picked and suggested members
 */
export const resolveKnownMembers = (
  members: Member[],
  knownMembers: Member[]
): Member[] =>
  removeDuplicateMembers(
    members.map(
      member =>
        knownMembers.find(known => isSameMember(member, known)) ?? member
    )
  )

/**
 * Turns the value of the Autocomplete, where typed texts stay strings, into members without duplicates
 * @param value - Picked members and typed texts
 * @param getMembersFromText - Turns a text into members
 */
export const makeMembersFromValue = (
  value: (Member | string)[],
  getMembersFromText: GetMembersFromText
): Member[] =>
  removeDuplicateMembers(
    value.flatMap(item =>
      typeof item === 'string' ? getMembersFromText(item) : [item]
    )
  )

/**
 * Members to suggest: the matching ones without duplicates, else the ones made from the text
 * @param matchingSuggestions - Fetched then local members matching the text
 * @param textSuggestions - Members made from the text
 */
export const makeSuggestions = (
  matchingSuggestions: Member[],
  textSuggestions: Member[]
): Member[] =>
  (matchingSuggestions.length > 0
    ? removeDuplicateMembers(matchingSuggestions)
    : textSuggestions
  ).slice(0, MAX_SUGGESTIONS)
