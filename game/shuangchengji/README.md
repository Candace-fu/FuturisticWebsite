# 双城记 · Godot 正式版

《双城记》正式版的 Godot 项目，iOS 优先。H5 原型（`public/shuangchengji/index.html`）继续用来写剧情；这里做 3D 工作室和正式版的玩法。

这个文件夹不在 `public/` 里，网站构建和部署都不会碰它。

## 打开

1. 安装 **Godot 4.7**（标准版，不用 .NET 版）。Mac 和 PC 装同一个版本。
2. 打开 Godot，选「导入」，选这个文件夹里的 `project.godot`。
3. 按 F5 运行（Mac 上是 ⌘B），会打开竖屏的工作室：
   - 拖动可以左右、上下看，双指或滚轮可以拉近。
   - 底部的滑条和「让时间走」按钮可以预览 10:00–22:00 的光影。

第一次打开时 Godot 会生成 `.godot/` 缓存文件夹，这是正常的。

## 现在有什么

| 文件 | 内容 |
|---|---|
| `scenes/studio.tscn` | 杭州工作室：房间、窗户、书桌、A1、电脑、杯子、手机、书签、收纳、台灯、垃圾桶、洞洞板、耗材架、挂钟 |
| `scripts/time_of_day.gd` | 一天的光影：太阳、天空、环境光、台灯，跟 H5 版同一套时间（杭州十月，日落约 17:30） |
| `scripts/camera_look.gd` | 坐在桌前的近景视角 |
| `scripts/wall_clock.gd` | 挂钟指针跟着时间走 |

场景里的东西都是 CSG 方块和圆柱拼的**占位**，尺寸按真实米数大致摆放。A1 只是大致比例，书签尺寸是估计的。之后用 Blender 做好的模型逐个替换。

场景开了景深和光晕，只在 Mobile 渲染器下生效（项目默认就是 Mobile）。

## 在 Mac 和 PC 之间同步

用 git，不用 iCloud、百度网盘这类同步盘。

- 换电脑前：提交、推送；到另一台：拉取。
- `.godot/` 已经在 `.gitignore` 里，不要手动同步。
- 大文件（`.blend`、`.glb`、图片、声音、`.stl`、`.3mf`）走 **Git LFS**，规则在 `.gitattributes`。两台电脑都要先装 Git LFS，然后运行一次 `git lfs install`。
- 换行统一成 LF，Mac 和 PC 之间不会出现整文件的差异。

## Blender → Godot

- `.blend` 源文件放 `blender/`。
- 在 Blender 里导出 **glTF 2.0（.glb）** 到 `assets/models/`，Godot 会自动导入。不要直接把 `.blend` 放进 Godot，那样每台电脑都要单独设置 Blender 路径。
- 尺寸用米，和场景一致。
- 光照：先在 Blender 里把光烘焙进贴图，或者在 Godot 里用 LightmapGI 烘焙。具体用哪种，等有了第一批真模型再试。

## 打包 iOS

只能在 Mac 上，用 Xcode。需要用公司的 Apple 开发者账号。导出设置（`export_presets.cfg`）里会有团队 ID 和证书信息，先不放进仓库。
