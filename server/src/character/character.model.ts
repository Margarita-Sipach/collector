import { Column } from "sequelize-typescript";
import { Base, uniqString } from "src/base/base.model";

interface CharacterCreationAttrs {
	title: string;
}

export class Character extends Base<Character, CharacterCreationAttrs> {
	@Column(uniqString)
	title: string;
}
