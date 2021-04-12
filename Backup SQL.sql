USE [DBTorneio]
GO

/****** Object:  Table [dbo].[Jogadors]    Script Date: 11/04/2021 22:58:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Jogadors](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [nvarchar](200) NULL,
	[Sexo] [nvarchar](25) NOT NULL,
	[Cpf] [nvarchar](14) NULL,	
 CONSTRAINT [PK_Jogadors] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

INSERT INTO [dbo].[Jogadors]
           ([Nome], [Cpf], [Sexo])
     VALUES
('Jogador01','013.873.876-93', 'Feminino'),

('Jogador02','709.393.486-24', 'Masculino'),

('Jogador03','236.071.676-05', 'Feminino'),

('Jogador04','842.085.146-98', 'Masculino'),

('Jogador05','858.241.926-00', 'Feminino')

GO