function getGuildAcronym(guildName: string) {
	return guildName
		.split(' ')
		.map(([firstLetter]) => firstLetter)
		.join('');
}

export default getGuildAcronym;
