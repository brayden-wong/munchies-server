import { Injectable } from "@nestjs/common";
import { Database, InjectDrizzle, recipes, users } from "@/modules/drizzle";
import { and, eq, like } from "drizzle-orm";

import { Explore, GetExploreParams } from "./explore.types";

@Injectable()
export class ExploreService {
  private static limit = 20 as const;
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async getExplore(params: GetExploreParams) {
    const explore: Explore = { users: [], recipes: [] };

    for (const objKey in params) {
      const key = objKey as keyof GetExploreParams;
      switch (key) {
        case "name":
          explore.users.push(...(await this.getUsersWithName(params[key])));
          break;
        case "username":
          explore.users.push(...(await this.getUsername(params[key])));
          break;
        case "recipe":
          explore.recipes.push(...(await this.getRecipes(params[key])));
          break;
      }
    }

    return explore;
  }

  private async getUsersWithName(name: string) {
    return this.db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        avatar: users.avatar,
      })
      .from(users)
      .limit(ExploreService.limit)
      .where(like(users.name, `%${name}%`))
      .execute();
  }

  private async getUsername(username: string) {
    return this.db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        avatar: users.avatar,
      })
      .from(users)
      .limit(ExploreService.limit)
      .where(like(users.username, `%${username}%`))
      .execute();
  }

  private async getRecipes(recipe: string) {
    return this.db
      .select({
        id: recipes.id,
        name: recipes.name,
        description: recipes.description,
        authorId: recipes.authorId,
      })
      .from(recipes)
      .limit(ExploreService.limit)
      .where(and(like(recipes.name, `%${recipe}%`), eq(recipes.public, true)))
      .execute();
  }
}
