import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";

interface IHasPermission {
    type: String;
    moduleName: String;
    actionName: String;
}

interface IAction {
    name: String;
    isActive: Boolean;
}

interface IModule {
    name: String;
    key: String;
    actions: IAction[]
}

const hasPermission = ({ type, moduleName, actionName }: IHasPermission) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;
        const foundUser = await userService.findUser({ _id: user._id });
        if (!foundUser) return res.status(404).json({ message: "User not found" });
        const userRoles = foundUser.role;
        const userType = foundUser.useType;

        if(userType !== type) return res.status(403).json({ message: "User doesn't have permission" });

        const allowModule = userRoles.modules.find((module: IModule) => {
            if (module.key === moduleName.toLowerCase()) return module
        })

        if (!allowModule) return res.status(403).json({ message: "User doesn't have permission" });

        let isAllow = false;
        switch (actionName.toLowerCase()) {
            case "view":
                isAllow = true;
                break;
            case "add":
                isAllow = !!allowModule.actions.find((action: IAction) => action.name.toLowerCase() === actionName && action.isActive)
                break;
            case "edit":
                isAllow = !!allowModule.actions.find((action: IAction) => action.name.toLowerCase() === actionName && action.isActive)
                break;
            case "delete":
                isAllow = !!allowModule.actions.find((action: IAction) => action.name.toLowerCase() === actionName && action.isActive)
                break;
            case "export":
                isAllow = !!allowModule.actions.find((action: IAction) => action.name.toLowerCase() === actionName && action.isActive)
                break;
            default:
                break;
        }

        if (!isAllow) return res.status(403).json({ message: "User doesn't have permission" });

        return next();
    }
}

export default hasPermission;
